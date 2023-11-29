import { Router } from 'express';
import UserController from "../controllers/UserController.js"


const UserRouter = Router();


UserRouter.post('/register', (req, res)=>{
  UserController.register(req.body)
  .then((response)=>{
    if(response.token){
      res.cookie('token', response.token).status(response.status).json(response.message)
    }else{
      res.status(response.status).json(response.message)
    }
  })
});

UserRouter.post('/login', (req, res)=>{
  UserController.login(req.body)
  .then((response)=>{
    if(response.token){
      res.cookie('token', response.token).status(response.status).json(response.message)
    }else{
      res.status(response.status).json(response.message)
    }
  })
});

// UserRouter.delete('/user/:id');

// UserRouter.put('user/:id');

export default UserRouter;