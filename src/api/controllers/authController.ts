import {Request, Response} from 'express'
import {authService} from "../services";
import {validationResult} from 'express-validator'

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
            const valResult = validationResult(req)

            if (!valResult.isEmpty()) {
                return res.status(400).json({ message: valResult.array() })
            }

            await authService.verifyUser(req.body, res)
        } catch (error) {
            console.error(error)
            res.status(500).json({message: "LoginVerify: Internal"})
        }
    }
}

const authController = new AuthController();
export default authController;
