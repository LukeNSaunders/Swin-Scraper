import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const tokenKey: Secret = process.env.TOKEN_KEY as Secret;

export interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const authenticateUser = (req: CustomRequest, res: Response, next: NextFunction) => {
  // checking for token in headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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
