import express from 'express'
import { register, verifyRegisterOTP, login, changePassword, verifyForgetPasswordOTP, sendOTP, setNewPassword } from '../controllers/auth.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify_register_otp', verifyRegisterOTP)
router.put('/login', login)
router.put('/forget_password', sendOTP)
router.put('/verify_forget_pass_otp', verifyForgetPasswordOTP)
router.put('/newpassword', setNewPassword)
router.put('/change_password', verifyToken, changePassword)


export default router