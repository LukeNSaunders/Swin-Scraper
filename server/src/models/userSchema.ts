import mongoose from './db';

interface UserAttributes {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface UserDocument extends mongoose.Document, UserAttributes {}

const User = mongoose.model<UserDocument>('Users', UserSchema);

export default User;
