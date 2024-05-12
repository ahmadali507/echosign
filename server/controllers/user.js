import User from "../models/user.js";
import { createError } from "../utils/functions.js";

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    // const result = await User.find({ _id: { $ne: req.user._id } })
    const result = await User.find({})
      .skip(skip)
      .limit(size)
      .exec();

    const totalCount = await User.countDocuments({});

    const response = {
      result,
      count: totalCount
    };

    res.status(200).json(response);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
    res.status(200).json(user);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
    res.status(200).json({ result: user });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const loggedInUser = await User.findById(req.user._id);

    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist && username != loggedInUser.username)
      return next(createError(res, 400, "Username already exist."));
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist && email != loggedInUser.email)
      return next(createError(res, 400, "Email already exist."));

    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { ...req.body } },
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId != req.user._id && res.user.role != 'Admin') return next(createError(res, 400, "You are not authorized to delete this user."));

    const user = await User.findById(userId);
    if (!user) return next(createError(res, "User not exist"));

    await User.findByIdAndDelete(user._id);
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteUserCollection = async (req, res, next) => {
  try {
    const result = await User.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
