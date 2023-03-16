import mongoose from "mongoose";

const uri = 'mongodb://localhost:27017/'

mongoose.set('strictQuery', true);

const connectMongo = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to the database !');
  } catch (error) {
    console.log('ERROR', error);
    return error
  }
}

connectMongo();

export default mongoose