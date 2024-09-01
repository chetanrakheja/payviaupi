import mongoose, { Schema, Document } from 'mongoose';
// import { LinkData,LinkScema } from './linkmodels';


export interface User extends Document {
  id: string;
  name: string;
  username: string;
  email: string;
  provider: string;
  image: string;
//   password: string;
//   verifyCode: string;
//   verifyCodeExpiry: Date; 
//   isVerified: boolean;
//   isAcceptingMessages: boolean;
//   links: LinkData[];
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  provider:{    
    type: String,
    required: [true, 'Provider is required'],
    default: 'google',
  },
    id: {
        type: String,
        required: [true, 'ID is required'],
    },
    image: {
        type: String,
        required: false,
    },
  
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//   },
//   verifyCode: {
//     type: String,
//     required: [true, 'Verify Code is required'],
//   },
//   verifyCodeExpiry: {
//     type: Date,
//     required: [true, 'Verify Code Expiry is required'],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAcceptingMessages: {
//     type: Boolean,
//     default: true,
//   },
//   links: [LinkScema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;
