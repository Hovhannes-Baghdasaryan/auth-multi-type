import express from 'express'
import {authController} from '../controllers'

const router = express.Router()

router.post('/login', authController.entryPoint)
router.post('/login-verify', authController.loginVerify)

export default router
