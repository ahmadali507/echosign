import User from "../models/user.js";
import Subscribe from "../models/subscribe.js";
import Contact from "../models/contact.js";
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

    const findedEmail = await User.findOne({ email });
    if (Boolean(findedEmail)) return next(createError(res, res, 400, "Email already exist"));

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


export const contact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name) return next(createError(res, 400, "Name is missing"));
    if (!email) return next(createError(res, 400, "Username/Email is missing"));
    if (!subject) return next(createError(res, 400, "Subject is missing"));
    if (!message) return next(createError(res, 400, "Message is missing"));

    const findedUser = await User.findOne({ email });
    if (findedUser) req.body = { ...req.body, user: findedUser._id }
    await Contact.create({ ...req.body })
    res.status(200).json({ message: "Form submitted successfully.", });
  } catch (err) {
    console.log('error', err)
    next(createError(res, 500, err.message));
  }
};


export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next(createError(res, 400, "Username/Email is missing"));

    const findedSubscribe = await Subscribe.findOne({ email })
    if (findedSubscribe) return res.status(201).json({ message: "Already Subscribed" })

    const findedUser = await User.findOne({ email });
    if (findedUser) req.body = { ...req.body, user: findedUser._id }
    await Subscribe.create({ ...req.body })
    res.status(200).json({ message: "Subscribed successfully.", });
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
export const getSubscribes = async (req, res, next) => {
  try {
    const findedSubscribe = await Subscribe.find()
    res.status(200).json({ result: findedSubscribe, message: "Subscribes fetched successfully.", });
  } catch (err) {
    next(createError(res, 500, err.message));
  }
};
