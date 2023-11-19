const {Router} = require('express');


const UserRouter = Router(); 


UserRouter.post('/register')

UserRouter.post('/login');

UserRouter.delete('/user/:id');

UserRouter.put('user/:id');