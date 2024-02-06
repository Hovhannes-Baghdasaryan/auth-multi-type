import {userService} from '../services'
import {Request, Response} from 'express'

class AuthController {
    async getUser(req: Request, res: Response) {
        try {
            // return await userService.getUser(req, res)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error})
        }
    }
}

const authController = new AuthController();
export default authController;
