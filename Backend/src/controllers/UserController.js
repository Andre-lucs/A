import { User } from "../models/User";
import {compare, genSalt, hash} from "bcryptjs"
import jwt, { sign } from 'jsonwebtoken'
import 'dotenv/config'

export const createUser = async (req, res) => {
    const {email, name, password} = req.body;

    try{
        if(!email || !name || !password)
            return res.status(400).send('Insira todas as informações!')
        const userExists = User.findById({email});
        if(!userExists) {
            const salt = genSalt(10);
            const pass = await hash(password, salt);
            const newUser = new User({email, name, password: pass})
            await newUser.save();
            const token = await jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE})
            return res.cookie({ 'token': token }).json({ success: true, message: 'Usuário cadastrado com sucesso!', data: newUser})
        }
        return res.status(201).send('Já existe um usuário com esse email');
    } catch (err) {
        res.status(404).json({err})
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Forneça todas as informações de login"});
        }

        const userExists = await User.findOne({email});
        if(!userExists)
            return res.status(404).json({message: 'Email ou senha inválidos'});

        const isPasswordMatched = await compare(password, userExists.password);
        if(!isPasswordMatched)
            return res.status(404).json({message: "Email ou senha inválidos"});

        const token = sign({id: userExists._id, name: userExists.name, email: userExists.email}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
        return res.status(200).cookie({"token": token}).json({message: "Usuário logado com sucesso!", isAuthenticated: true});
    } catch (err) {

    }
}