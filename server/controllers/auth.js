import User from "../models/user.js";
import { createError } from "../utils/functions.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    if (!username) return next(createError(res, 400, "Username is missing"));
    if (!email) return next(createError(res, 400, "Email is missing"));
    if (!password) return next(createError(res, 400, "Password is missing"));

    const findedUser = await User.findOne({ username });
    if (Boolean(findedUser)) return next(createError(res, res, 400, "Username already exist"));

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.status(200).json({ result: newUser, message: "Registered successfully.", token });
  } catch (err) {
    console.log('error', err)
    next(createError(res, 500, err.message));
  }
};
export const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password: input_password } = req.body;

    if (!usernameOrEmail) return next(createError(res, 400, "Username/Email is missing"));
    if (!input_password) return next(createError(res, 400, "Password is missing"));

    const findedUserByUsername = await User.findOne({ username: usernameOrEmail });
    const findedUserByEmail = await User.findOne({ email: usernameOrEmail });
    if (!findedUserByEmail && !findedUserByUsername) return next(createError(res, 400, "Wrong Credentials - username/email"));

    const findedUser = findedUserByUsername ? findedUserByUsername : findedUserByEmail;

    const isPasswordCorrect = await bcrypt.compare(input_password, findedUser.password);
    if (!isPasswordCorrect) return next(createError(res, 401, "Wrong Credentials - password"));

    const token = jwt.sign({ _id: findedUser._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login successfully.", result: findedUser, token });
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
