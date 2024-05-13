import express from "express"
const router = express.Router()

import { uploadImage, deleteImage } from "../controllers/general.js"
import { verifyToken } from "../middleware/auth.js"

import { upload } from "../multer.js"

router.post('/upload_image', verifyToken, upload.single('image'), uploadImage)
router.delete('/delete_image/:filename', verifyToken, deleteImage)

export default router