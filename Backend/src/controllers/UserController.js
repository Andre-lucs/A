import  UserModel  from "../models/User.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'


const register = async ({email, name, password}) => {
    try{
        if(!email || !name || !password){
            return {message: "Insira todas as informações!", status: 400}
        }
        const userExists = await UserModel.findOne({email});
        if(userExists){
            return {message: "Já existe um usuário com esse email", status: 400};
        }

        const salt = await bcryptjs.genSalt(10);
        const pass = await bcryptjs.hash(password, salt);
        const newUser = await UserModel.create({email, name, password: pass});
        const mytoken = jsonwebtoken.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES});

        return {token: mytoken, message: newUser, status: 201};

    } catch (err) {
        return {message: err, status: 500};
    }
}

const login = async ({email, password}) => {
    try{
        if(!email || !password) {
            return {message: "Forneça todas as informações de login", status: 400}
        }

        const userExists = await UserModel.findOne({email});
        if(!userExists)
            return {message: "Email ou senha inválidos", status: 404};

        const isPasswordMatched = await bcryptjs.compare(password, userExists.password);
        if(!isPasswordMatched)
            return {message: "Email ou senha inválidos", status: 404};

        const mytoken = jsonwebtoken.sign({id: userExists._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES});

        return {token: mytoken, message: "Usuário logado com sucesso!", status: 200};
    } catch (err) {
        return {message: err, status: 500};
    }
}

export default {register, login, UserModel};