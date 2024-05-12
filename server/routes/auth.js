import express from 'express'
import { register, login, subscribe, getSubscribes, contact } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.put('/login', login)

router.post('/contact', contact)

router.put('/subscribe', subscribe)
router.get('/subscribe', getSubscribes)

export default router