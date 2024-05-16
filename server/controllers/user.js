import User from "../models/user.js";
import { createError } from "../utils/functions.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const { page, pageSize, enablePagination = false } = req.query;

    let query = User.find({ _id: { $ne: req.user._id } });

    let resultPromise;
    if (Boolean(enablePagination)) {
      const pageNumber = parseInt(page, 10) || 1;
      const size = parseInt(pageSize, 10) || 10;
      const skip = (pageNumber - 1) * size;

      query = query.skip(skip).limit(size);
      resultPromise = query.exec();
    } else {
      resultPromise = query.exec();
    }

    const [result, totalCount] = await Promise.all([resultPromise, Boolean(enablePagination) ? User.countDocuments({ _id: { $ne: req.user._id } }) : User.countDocuments({}),]);

    const response = { result, count: totalCount, };

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
    // const { username, email } = req.body;

    // const loggedInUser = await User.findById(req.user._id);

    // const isUsernameExist = await User.findOne({ username });
    // if (isUsernameExist && username != loggedInUser.username)
    //   return next(createError(res, 400, "Username already exist."));
    // const isEmailExist = await User.findOne({ email });
    // if (isEmailExist && email != loggedInUser.email)
    //   return next(createError(res, 400, "Email already exist."));

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
export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user._id

    const findedUser = await User.findById(userId)
    if (!findedUser) return res.status(400).json({ message: 'User not found.' })

    const isPasswordCorrect = await bcrypt.compare(oldPassword, findedUser.password);
    if (!isPasswordCorrect) return next(createError(res, 401, "Wrong Credentials"));

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const result = await User.findByIdAndUpdate(req.user._id, { $set: { password: hashedPassword } }, { new: true });
    res.status(200).json({ result, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('error', error)
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
