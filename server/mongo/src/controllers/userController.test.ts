import { registerUser } from './userController';
import User from '../models/userSchema';
import bcrypt from 'bcrypt';
import mongoose from '../models/db';
import { connectMongo } from '../models/db';

// Mock the userSchema model and bcrypt library

jest.mock('../models/userSchema');
jest.mock('bcrypt');

const uri: string | undefined = process.env.MONGODB_URI;

describe('registerUser', () => {
  let req: any;
  let res: any;
  
  // Connect to MongoDB before starting the tests

  beforeAll(async () => {
    if (uri) await connectMongo();
  });

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  // clear all mock function calls between test cases and disconnect MongoDB

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  // FAIL AND 409 STATUS

  it('should return 409 if username or email already exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValueOnce({});

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({ message: 'Username already exists', status: 409 });
  });

  // FAIL AND 400 STATUS

  it('should return 400 if password is empty', async () => {
    req.body.password = '';

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'Password cannot be empty', status: 400 });
  });

  // SUCCESS AND 201 STATUS

  it('should create a new user with hashed password and return 201', async () => {
    // Mocking User.findOne, bcrypt.genSalt, bcrypt.hash, and User.create functions

    (User.findOne as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    (bcrypt.genSalt as jest.Mock).mockResolvedValue(10);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
    (User.create as jest.Mock).mockResolvedValue({
      ...req.body,
      password: 'hashed_password',
    });

    await registerUser(req, res);

    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.create).toHaveBeenCalledWith({
      ...req.body,
      password: 'hashed_password',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      ...req.body,
      password: 'hashed_password',
    });
  });
});
