import jwt from 'jsonwebtoken';
import {Response, NextFunction } from 'express';
import { authenticateUser, CustomRequest } from './auth';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Auth Middleware', () => {
  let req: CustomRequest;
  let res: Response;
  let next: NextFunction;
  const tokenKey =  process.env.TOKEN_KEY;

  beforeEach(() => {
    req = {
      headers: {},
    } as CustomRequest;
  
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  
    next = jest.fn();
  
    // Set the TOKEN_KEY environment variable for testing
    process.env.TOKEN_KEY = tokenKey;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 403 if no token is provided', () => {
    authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('A token is required for authentication');
  });

  it('should call next() if the token is valid', () => {
    const token = 'test-token';
    const decoded = { id: 'user-id' };

    req.headers.authorization = `Bearer ${token}`;

    (jwt.verify as jest.Mock).mockReturnValue(decoded);

    authenticateUser(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(token, tokenKey);
    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if the token is invalid', () => {
    const token = 'invalid-token';

    req.headers.authorization = `Bearer ${token}`;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid Token');
    });

    authenticateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid Token');
  });
});
