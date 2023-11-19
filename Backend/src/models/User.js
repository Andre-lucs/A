import { UserSchema } from "../schema/UsuarioSchema";
import mongoose from "mongoose";


export const User = mongoose.model('User', UserSchema);