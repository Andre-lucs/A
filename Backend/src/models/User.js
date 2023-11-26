import { UserSchema } from "../schema/UsuarioSchema.js";
import mongoose from "mongoose";

export const User = mongoose.model('Usuario', UserSchema);
