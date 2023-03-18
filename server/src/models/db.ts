import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const uri : string | undefined = process.env.MONGODB_URI

mongoose.set('strictQuery', false);

const connectMongo = async () => {
  try {
    if (uri) await mongoose.connect(uri);
    console.log('Successfully connected to the database !');
  } catch (error) {
    console.log('ERROR', error);
    return error
  }
}

connectMongo();

export default mongoose