import { isAuthenticated } from '../auth';
import jwt from 'jsonwebtoken';
import httpMocks from 'node-mocks-http';

jest.mock('jsonwebtoken');

describe('isAuthenticated Middleware', () => {
  test('Deve recusar o acesso ao sistema caso o usuário não esteja autenticado', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await isAuthenticated(req, res, next);

    expect(next).toHaveBeenCalledWith({ message: 'Token de acesso não encontrado', status: 401 });
  });

  test('O sistema deve recusar delatar um usuário ao informar seu email e a senha inválidos', async () => {
    jwt.verify.mockImplementationOnce((token, secret, cb) => cb(true));

    const req = httpMocks.createRequest({
      cookies: {
        token: 'invalid_token',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await isAuthenticated(req, res, next);

    expect(next).toHaveBeenCalledWith({ error: 'Token invalido', status: 401 });
  });

  test('Usuario está autenticado', async () => {
    jwt.verify.mockImplementationOnce((token, secret, cb) => cb(false, { id: 'user_id' }));

    const req = httpMocks.createRequest({
      cookies: {
        token: 'valid_token',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await isAuthenticated(req, res, next);

    expect(req.user).toBe('user_id');
    expect(next).toHaveBeenCalledWith();
  });
});