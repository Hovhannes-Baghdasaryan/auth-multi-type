import {userService} from '../services'
import {Request, Response} from 'express'

class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const userId = req.params.id
            return await userService.getUser(Number(userId), res)
        } catch (error) {
            console.error(error)
        }
    }
}

const userController = new UserController();
export default userController;
