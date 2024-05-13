import {
  getUsers,
  getUser,
  getProfile,
  updateUser,
  deleteUser,
  deleteUserCollection,
  updateProfile,
  updatePassword,
} from "../controllers/user.js";

import { verifyAdmin, verifyToken } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/all", verifyToken, getUsers);
router.get("/single/:userId", getUser);
router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);
router.put("/password", verifyToken, updatePassword);
router.put("/single/:userId", verifyToken, updateUser);

router.delete("/single/:userId", verifyToken, deleteUser);

router.delete("/delete-collection", verifyAdmin, deleteUserCollection);

export default router;
