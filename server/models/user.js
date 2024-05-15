import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  photoUrl: { type: String },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  friends: [{ type: Types.ObjectId, ref: "User" }],
  sentRequests: [{ type: Types.ObjectId, ref: "User" }],
  receivedRequests: [{ type: Types.ObjectId, ref: "User" }],
  notifications: [{ type: Types.ObjectId, ref: "Notification" }],
}, { timestamps: true });

const User = model("User", userSchema);
export default User;
