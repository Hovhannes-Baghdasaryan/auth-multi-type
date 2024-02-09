import {Request, Response} from 'express'
import {authService} from "../services";

class AuthController {
    async entryPoint(req: Request, res: Response) {
        try {
            const {username} = req.body

            await authService.createEntryPointUser(username, res)
        } catch (error) {
            console.error(error)
            res.status(500).json({message: "EntryPoint: Internal"})
        }
    }

    async loginVerify(req: Request, res: Response) {
        try {
            await authService.verifyUser(req.body, res)
        } catch (error) {
            console.error(error)
            res.status(500).json({message: "LoginVerify: Internal"})
        }
    }
}

const authController = new AuthController();
export default authController;
