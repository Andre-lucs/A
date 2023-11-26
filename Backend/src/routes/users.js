import { Router } from 'express';
import {login, register} from "../controllers/UserController.js"


const UserRouter = Router(); 


UserRouter.post('/register', register)

UserRouter.post('/login', login);

// UserRouter.delete('/user/:id');

// UserRouter.put('user/:id');

export default UserRouter;