import express from 'express'
import {authController} from '../controllers'
import {loginVerifyValidator} from "../validators/authValidator.ts";

const router = express.Router()

router.post('/login', loginVerifyValidator(), authController.entryPoint)
router.post('/login-verify', loginVerifyValidator(), authController.loginVerify)

export default router
