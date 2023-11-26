import  {User}  from "../models/User.js";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const register = async (req, res) => {
    const {email, name, password} = req.body;

    try{
        if(!email || !name || !password)
            return res.status(400).send('Insira todas as informações!')
        const userExists = await User.findOne({email});
        if(!userExists) {
            const salt = await bcryptjs.genSalt(10);
            const pass = await bcryptjs.hash(password, salt);
            const newUser = new User({email, name, password: pass})
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES})
            console.log(token)
            return res.cookie('token', token).json({ success: true, message: 'Usuário cadastrado com sucesso!', data: newUser})
        }
        return res.status(400).send('Já existe um usuário com esse email');
    } catch (err) {
        res.status(500).json({err})
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

        const isPasswordMatched = await bcryptjs.compare(password, userExists.password);
        if(!isPasswordMatched)
            return res.status(404).json({message: "Email ou senha inválidos"});

        const token = jwt.sign({id: userExists._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES});
        console.log(token)
        return res.status(200).cookie("token", token).json({message: "Usuário logado com sucesso!", isAuthenticated: true});
    } catch (err) {
        res.status(500).send({err})
    }
}