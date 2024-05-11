import { Schema, model, Document, Types } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  verified: { type: Boolean, default: false },
});

// Create a model with the specified document type
const User = model("User", userSchema);

export default User;
