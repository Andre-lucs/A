import  UserModel  from "../models/User.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config'

const findAll = async () => {
    try {
        const users = await UserModel.find();
        return {message: users, status: 200};
    } catch (err) {
        return {message: err, status: 500};
    }
}

const findById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if(!user){
            return {message: "Usuário não encontrado", status: 404};
        }
        return {message: user, status: 200};
    } catch (err) {
        return {message: err, status: 500};
    }
}

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
            return {message: "Email não cadastrado", status: 404};

        const isPasswordMatched = await bcryptjs.compare(password, userExists.password);
        if(!isPasswordMatched)
            return {message: "Senha inválida", status: 400};

        const mytoken = jsonwebtoken.sign({id: userExists._id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES});

        return {token: mytoken, message: "Usuário logado com sucesso!", status: 200};
    } catch (err) {
        return {message: err, status: 500};
    }
}

const edit = async (id, {email, name, password}) => {
    try {
        if (!email || !name || !password) {
            return {message: "Insira todas as informações!", status: 400};
        }

        if( await UserModel.findOne({email})) { return {message: "Já existe um usuário com esse email", status: 400};}

        const userExists = await UserModel.findById(id);
        if (!userExists) {
            return {message: "Usuário não encontrado", status: 404};
        }

        const salt = await bcryptjs.genSalt(10);
        const pass = await bcryptjs.hash(password, salt);

        userExists.email = email;
        userExists.name = name;
        userExists.password = pass;

        await userExists.save();

        return {message: "Usuário editado com sucesso!", status: 200};
    } catch (err) {
        return {message: err, status: 500};
    }
};

const deleteById = async (id) => {
    try {
        const userExists = await UserModel.findByIdAndDelete(id);
        if (!userExists) {
            return {message: "Usuário não encontrado", status: 404};
        }
        return {message: "Usuário deletado com sucesso!", status: 200};
    } catch (err) {
        return {message: err, status: 500};
    }
}

export default {register, login, edit, deleteById, findAll, findById, UserModel};