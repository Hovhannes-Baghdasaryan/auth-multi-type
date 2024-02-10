import express from 'express'
import {userController} from '../controllers'
import {getAllUsersValidator, getSingleUserValidator} from "../validators/userValidator.ts";

const router = express.Router()

router.get('/:id', getSingleUserValidator, userController.getUser)
router.get("/", getAllUsersValidator, userController.getAllUsers)

export default router
