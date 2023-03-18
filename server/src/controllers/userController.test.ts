import { registerUser } from './userController';
import { Request, Response } from 'express';
import  User  from '../models/userSchema';
import bcrypt from 'bcrypt';

describe('registerUser', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'testpassword',
      },
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ... other tests

  it('should create a new user and return a 201 status code if the user does not exist and password is not empty', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(User, 'create').mockResolvedValueOnce(req.body as any);

    const mockHashedPassword: string = 'mockhashedpassword';
    const saltRounds  = 10;
    jest.spyOn(bcrypt, 'genSalt').mockImplementation((rounds: any, callback: any) => {
      if (typeof callback === 'function') {
        callback(null, saltRounds);
      }
      return Promise.resolve(saltRounds);
    });
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(mockHashedPassword as never);

    await registerUser(req, res);

    expect(User.findOne).toHaveBeenCalledTimes(2);
    expect(User.create).toHaveBeenCalledWith({
      ...req.body,
      password: mockHashedPassword,
    });
    expect(bcrypt.genSalt).toHaveBeenCalledWith(saltRounds, expect.any(Function));
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, saltRounds);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(req.body);
  });

  // ... other tests
});
