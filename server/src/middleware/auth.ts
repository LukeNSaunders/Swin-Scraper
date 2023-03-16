import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const tokenKey: Secret = process.env.TOKEN_KEY as Secret;

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const authenticateUser = (req: CustomRequest,res: Response,next: NextFunction) => {
  // checking for token in different locations 
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    // verify JWT token using token key
    const decoded: JwtPayload = jwt.verify(token, tokenKey) as JwtPayload;

    // set decoded payload as user property of the request object
    req.user = decoded;
    next();
    
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};
