import jwt from "jsonwebtoken";
import 'dotenv/config'

export const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return next('Please login to access the data');
        }
        await jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
            if (err){
                let err = { error:"Token invalido", status: 401};
                console.log(err)
                return next(err);
            }
            req.user = decoded.id;
        });
        next();
    } catch (error) {
       return next(error); 
    }
}

