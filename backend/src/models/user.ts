import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  userUUID: string;
  name?: string | null;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    userUUID: {
  type: String,
  default: () => uuidv4(),
  unique: true,
},
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
