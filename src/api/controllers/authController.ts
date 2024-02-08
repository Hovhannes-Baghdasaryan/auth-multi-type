import {Request, Response} from 'express'
import {authService} from "../services";

class AuthController {
    async entryPoint(req: Request, res: Response) {
        const {username} = req.body

        try {
            await authService.createEntryPointUser(username, res)
        } catch (error) {
            console.error(error)
            res.status(500).json({message: "Entry_Point: Internal"})
        }
    }

    async loginVerify(req: Request, res: Response) {
        try {
            await authService.verifyUser(req.body, res)
        } catch (error) {
            console.error(error)
        }
    }
}

const authController = new AuthController();
export default authController;
