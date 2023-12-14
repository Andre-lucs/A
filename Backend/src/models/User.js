import { UserSchema } from "../schema/UsuarioSchema.js";
import mongoose from "mongoose";

export default mongoose.model('Usuario', UserSchema);
