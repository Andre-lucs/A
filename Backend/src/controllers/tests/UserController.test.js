import UserController from '../UserController';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'

jest.mock('../../models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Teste de UserController', () => {
  describe('Casos de sucesso', () => {
    test('Deve ser possivel cadastrar um usuario', async () => {
      const dados = {
        email: 'example@gmail.com',
        name: 'Example',
        password: 'asdfghjkl'
      }
      dados.password = '$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2';

      bcryptjs.genSalt.mockReturnValue('$2a$10$VMLj2QH/ilvDovqrqC8s4u')
      bcryptjs.hash.mockReturnValue('$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2')
      jsonwebtoken.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjYyYWIzYmUxNmNhNThlNGE0ZmJhNiIsImlhdCI6MTcwMTE5NDQxOSwiZXhwIjoxNzAxMTk4MDE5fQ.LXy-XyX6R45O7T-6ZuA3hroug99bsowAm1sjTlxhPxc');
      UserController.UserModel.create.mockReturnValue({...dados, _id: new mongoose.Types.ObjectId()});


      const response = await UserController.register(dados);

      console.log(response)
      expect(response.token).toBeDefined();
      expect(response.status).toBe(201);
      expect(response.message).toEqual({...dados, _id: expect.any(mongoose.Types.ObjectId)});
    })

    test('Deve ser possivel autenticar um usuario', async () => {
      const email = 'email@example.com'
      bcryptjs.compare.mockReturnValue(true);
      jsonwebtoken.sign = jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjYyYWIzYmUxNmNhNThlNGE0ZmJhNiIsImlhdCI6MTcwMTE5NDQxOSwiZXhwIjoxNzAxMTk4MDE5fQ.LXy-XyX6R45O7T-6ZuA3hroug99bsowAm1sjTlxhPxc');
      UserController.UserModel.findOne.mockReturnValue({
        _id: new mongoose.Types.ObjectId(),
        email: 'email@example.com',
        password: '$2a$10$VMLj2QH/ilvDovqrqC8s4uybSYSaJxN64eyi8XHFwXG8aQstiJWl2'
    })

    const response = await UserController.login({email, password: 'asdfghjkl'});
    console.log(response)
    expect(response.token).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.message).toEqual('Usuário logado com sucesso!');
    })

  });
  describe('Casos em erros', () => {
    test('Não deve cadastrar um usuário com o mesmo email', async () => {
      const dados = {
        email: 'example@gmail.com',
        name: 'Example',
        password: 'asdfghjkl'
      }

      UserController.UserModel.create.mockReturnValue({...dados, _id: new mongoose.Types.ObjectId()});

      UserController.UserModel.findOne.mockReturnValue({...dados, _id: new mongoose.Types.ObjectId()});
      const response = await UserController.register(dados);
      expect(response.message).toEqual("Já existe um usuário com esse email")
      expect(response.status).toEqual(400)
    })
  });

  test('Não deve cadastrar um usuário com dados faltando', async () => {
    const dados = {
      email: 'example@gmail.com',
      password: 'asdfghjkl'
    }

    const response = await UserController.register(dados);
    expect(response.message).toEqual("Insira todas as informações!")
    expect(response.status).toEqual(400)
  })
});
