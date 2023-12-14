import { Router } from 'express';
import UserController from "../controllers/UserController.js"


const UserRouter = Router();

UserRouter.get('/', (req, res) => {
  UserController.findAll()
    .then((response) => {
      res.status(response.status).json(response.message);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    });
});

UserRouter.get('/:id', (req, res) => {
  UserController.findById(req.params.id)
    .then((response) => {
      res.status(response.status).json(response.message);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    });
});

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

UserRouter.delete('/:id', (req, res)=>{
  UserController.deleteById(req.params.id)
  .then((response)=>{
    res.status(response.status).json(response.message)
  })

});

UserRouter.put('/:id', (req, res)=>{
  UserController.edit(req.params.id, req.body)
  .then((response)=>{
    res.status(response.status).json(response.message)
  })
});

export default UserRouter;