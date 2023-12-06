import jwt from "jsonwebtoken";
import 'dotenv/config'

export const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return next({message:"Token de acesso não encontrado", status: 401});
        }
        await jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
            if (err){
                let err = { error:"Token invalido", status: 401};
                return next(err);
            }
            req.user = decoded.id;
        });
        next();
    } catch (error) {
       return next(error); 
    }
}

