import User, {UserDocument} from "../models/userSchema";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";

const saltRounds : number = 12 

export const registerUser = async (req: Request,res: Response) : Promise<void>=> {
  const {username, email, password} = req.body

  try {
    const checkUsername  = await User.findOne({username:username})
    const checkEmail = await User.findOne({email:email})
    if (checkUsername || checkEmail) {
      res.status(409).send({message:"Username already exists", status:409})
      return; 
    }
    if (password === "") {
      res.status(400).send({message:"Password cannot be empty", status:400})
    }

    const hashedPassword : string = await bcrypt.hash(password, saltRounds)
    const newUser : UserDocument = new User({...req.body, password : hashedPassword})
    const savedUser : UserDocument = await newUser.save();
    
    res.status(201).send(savedUser)
  
  } catch (error) {
    console.log('ERROR', error)
  }
} 