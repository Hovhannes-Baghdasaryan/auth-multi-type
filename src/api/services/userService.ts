import {Response} from 'express'
import {userRepository} from "../../data-layer/repository/sequilize";
import {I_UserById} from "../../data-layer/repository/sequilize/users/dto.ts";

class UserService {
    private readonly _userRepository = userRepository

    async getUser(userId: number, res: Response): Promise<Response<I_UserById>> {
        try {
            const user = await this._userRepository.getUserById(userId)
            if (!user) {
                console.error("GetUserService: User not found")
                return res.status(400).send("GetUserService: User not found")
            }

            console.info(`GetUserService: User found ${user.first_name}`)

            return res.status(200).json({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            } as I_UserById)
        } catch (error) {
            console.log(`GetUserService: ${error}`)
            return res.status(500).send("GetUserService: Internal")
        }
    }
}

const userService = new UserService()
export default userService