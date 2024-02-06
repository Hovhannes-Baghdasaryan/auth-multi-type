import {userRepository} from "../../data-layer/repository/sequilize";
import {Request, Response} from "express"
import {I_UserById} from "../../data-layer/repository/sequilize/users/dto.ts";

class AuthService {
    private readonly _userRepository = userRepository

    async getUser(req: Request, res: Response) {
        const userId = req.params.id
        const user = await this._userRepository.getUserById(Number(userId))
        if (!user) {
            console.error("User not found")
            return res.status(404).json({message: 'User not found'})
        }

        console.info("User found")

        return res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        } as I_UserById)
    }
}

const authService = new AuthService()
export default authService