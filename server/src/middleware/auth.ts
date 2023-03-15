import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

// dummy secret password 

const secret = 'supersecret'

interface CustomRequest extends Request {
  user?: JwtPayload
}

export const authenticateToken = (req:CustomRequest, res:Response, next:NextFunction) => {
  // checking for token in different locations 
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded : JwtPayload = jwt.verify(token, secret) as JwtPayload
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};