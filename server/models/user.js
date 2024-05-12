import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
