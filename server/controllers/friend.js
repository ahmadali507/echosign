import User from "../models/user.js";
import { createError } from "../utils/functions.js";

export const getFriends = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { page, pageSize, count, enablePagination = false } = req.query;

    let query = User.findById(userId, { friends: 1 }).populate("friends");

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

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments({ _id: userId }) : Promise.resolve(null),
    ]);

    let response = { result: result.friends };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const searchFriends = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { page, pageSize, count, query: searchQuery, enablePagination = false } = req.query;

    let user = await User.findById(userId, { friends: 1 }).populate("friends");

    if (!user) {
      return next(createError(res, 404, 'User not found'));
    }

    let friendsQuery = User.find({
      _id: { $in: user.friends.map(friend => friend._id) },
    });

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      friendsQuery = friendsQuery.or([
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { username: { $regex: regex } },
        { email: { $regex: regex } },
      ]);
    }

    let resultPromise;

    if (Boolean(enablePagination)) {
      const pageNumber = parseInt(page, 10) || 1;
      const size = parseInt(pageSize, 10) || 10;
      const skip = (pageNumber - 1) * size;

      friendsQuery = friendsQuery.skip(skip).limit(size);
      resultPromise = friendsQuery.exec();
    } else {
      resultPromise = friendsQuery.exec();
    }

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(friendsQuery) : Promise.resolve(null),
    ]);

    let response = { result };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    const { page, pageSize, count, query: searchQuery, enablePagination = false } = req.query;

    let query = User.find(); // Start with finding all users

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // 'i' for case-insensitive search
      query = query.or([
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { username: { $regex: regex } },
        { email: { $regex: regex } },
      ]);
    }

    let resultPromise;

    if (Boolean(enablePagination)) {
      const pageNumber = parseInt(page, 10) || 1;
      const size = parseInt(pageSize, 10) || 10;
      const skip = (pageNumber - 1) * size;

      query = query.skip(skip).limit(size);
      resultPromise = query.populate("friends").exec();
    } else {
      resultPromise = query.populate("friends").exec();
    }

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    let response = { result };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};


export const getSuggestedUsers = async (req, res, next) => {
  try {
    const userId = req.user._id

    const allUsers = await User.find(
      { _id: { $ne: userId } },
      { firstName: 1, lastName: 1, username: 1, email: 1, photoUrl: 1, friends: 1, sentRequests: 1, receivedRequests: 1, }
    );
    const loggedUser = await User.findById(userId);

    const suggestedUsers = allUsers?.filter((user) => {
      return (
        user?.friends.indexOf(req?.user?._id) === -1 &&
        user?.sentRequests.indexOf(req?.user?._id) === -1 &&
        user?.receivedRequests.indexOf(req?.user?._id) === -1 &&
        user?.id !== req?.user?._id
      );
    });

    const usersWithMutualFriends = suggestedUsers.map((user) => {
      const mutualFriends = user?.friends?.filter((friendId) => loggedUser?.friends?.includes(friendId));
      return { ...user?._doc, mutualFriends: mutualFriends.length, };// Use _doc to get the raw document data
    });

    res.status(200).json(usersWithMutualFriends);
  } catch (err) {
    console.error('err', err)
    next(createError(res, 500, "Internal Server Error"));
  }
};

export const getSentRequests = async (req, res, next) => {
  // this request is made by the sender
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId, { sentRequests: 1 }, { firstName: 1, lastName: 1, username: 1, email: 1, photoUrl: 1 }).populate("sentRequests");
    res.status(200).json(user?.sentRequests);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getReceivedRequests = async (req, res, next) => {
  // this request is made by the sender
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId, { receivedRequests: 1 }, { firstName: 1, lastName: 1, username: 1, email: 1, photoUrl: 1 }).populate("receivedRequests");
    res.status(200).json(user?.receivedRequests);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const sendFriendRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req?.user?._id;

    // Check if the sender and receiver are the same user
    if (userId === receiverId) {
      return next(
        createError(res, 400, "Sender and receiver cannot be the same user?.")
      );
    }

    const loggedUser = await User.findById(userId);
    if (!loggedUser) return next(createError(res, 400, "Wrong Sender Id"));

    const receiver = await User.findById(receiverId);
    if (!receiver) return next(createError(res, 400, "Wrong Receiver Id"));

    // Update sender's sentRequests and receiver's receivedRequests
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { sentRequests: receiver._id.toString() } }, // Fix: removed unnecessary `$` before sentRequests
      { new: true }
    );

    const updatedReceiver = await User.findByIdAndUpdate(
      receiverId,
      { $addToSet: { receivedRequests: loggedUser._id.toString() } }, // Fix: removed unnecessary `$` before receivedRequests
      { new: true }
    );

    res.status(200).json(updatedReceiver);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const rejectFriendRequest = async (req, res, next) => {
  try {
    const { senderId } = req.params;
    const userId = req?.user?._id;
    // TODO: ADD NOTIFICATIONS
    const sender = await User.findById(senderId);
    if (!sender) return next(createError(res, 400, "Wrong Sender Id"));

    const loggedUser = await User.findById(userId);
    if (!loggedUser) return next(createError(res, 400, "Wrong Receiver Id"));

    const updatedSender = await User.findByIdAndUpdate(senderId, { $pull: { sentRequests: String(loggedUser._id) } }, { new: true });

    await User.findByIdAndUpdate(userId, { $pull: { receivedRequests: String(sender._id) } }, { new: true });

    res.status(200).json(updatedSender);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const removeFriendRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req?.user?._id; // sender is loggedUser

    const receiver = await User.findById(receiverId);
    if (!receiver) return next(createError(res, 400, "Wrong Receiver Id"));

    const loggedUser = await User.findById(userId);
    if (!loggedUser) return next(createError(res, 400, "Wrong Sender Id"));

    const updatedReceiver = await User.findByIdAndUpdate(
      receiverId,
      { $pull: { receivedRequests: String(loggedUser._id) } }, // sender is loggedUser
      { new: true }
    );

    await User.findByIdAndUpdate(userId, { $pull: { sentRequests: String(receiver._id) } }, { new: true });

    res.status(200).json(updatedReceiver);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const acceptFriendRequest = async (req, res, next) => {
  try {
    const { senderId } = req.params;

    const sender = await User.findById(senderId);
    if (!sender) return next(createError(res, 400, "Wrong Sender Id"));

    const loggedUser = await User.findById(req.user?._id);
    if (!loggedUser) return next(createError(res, 400, "Wrong Receiver Id"));

    const updatedSender = await User.findByIdAndUpdate(sender._id, { $addToSet: { friends: loggedUser._id }, $pull: { sentRequests: String(loggedUser._id) }, }, { new: true });

    await User.findByIdAndUpdate(loggedUser._id, { $addToSet: { friends: sender._id }, $pull: { receivedRequests: String(sender._id) }, }, { new: true });

    res.status(200).json(updatedSender);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
