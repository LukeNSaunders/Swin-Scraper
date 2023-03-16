import User, {UserDocument} from "../models/userSchema";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";

export const registerUser = async (req: Request,res: Response) : Promise<void>=> {
  const {username, email, password} = req.body

  try {
    // check for already existing user 
    const usernameExists = await User.findOne({username:username})
    const emailExists = await User.findOne({email:email})

    if (usernameExists|| emailExists) {
      res.status(409).send({message:"Username already exists", status:409})
      return; 
    }
    if (password === "") {
      res.status(400).send({message:"Password cannot be empty", status:400})
    }
    // hash and store password if user does not exist 
    const saltRounds : number | string = await bcrypt.genSalt()
    const hashedPassword : string = await bcrypt.hash(password, saltRounds)

    //create new user 
    const newUser : UserDocument = await User.create({...req.body, password : hashedPassword})
    res.status(201).send(newUser)
  } catch (error) {
    console.log('ERROR', error)
  }
} 