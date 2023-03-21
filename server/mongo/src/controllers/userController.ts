import User, { UserDocument } from '../models/userSchema';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

const tokenKey: Secret = process.env.TOKEN_KEY as Secret;

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // check if user already exists
    const usernameExists = await User.findOne({ username: username });
    const emailExists = await User.findOne({ email: email });

    if (usernameExists || emailExists) {
      res.status(409).send({ message: 'Username already exists', status: 409 });
      return;
    }
    if (password === '') {
      res.status(400).send({ message: 'Password cannot be empty', status: 400 });
    }
    // hash and store password if user does not exist
    const saltRounds: number | string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    //create new user
    const newUser: UserDocument = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500);
    console.log('ERROR', error);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).send({ message: 'Invalid credentials', status: 401 });
      return;
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid) {
      // send JWT token for authentification if password matches
      const token = jwt.sign({ userId: user._id }, tokenKey, {
        expiresIn: '2h',
      });
      user.token = token;
      res.status(200).send({ message: 'Authentication successful', status: 200, token });
      return;
    } else {
      res.status(409).send({ message: 'Invalid password', status: 409 });
      return;
    }
  } catch (error) {
    console.log(`${username} was not found`);
    res.status(500);
  }
};
