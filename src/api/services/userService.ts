import {Response} from 'express'
import {I_User} from "../dto/userDto.ts";
import {userRepository} from "../../data-layer/repository/sequilize";
import {UserAttributes} from "../../data-layer/models/sequilize/users/types.ts";

class UserService {
    async getUser(userId: number, res: Response): Promise<Response<I_User>> {
        try {
            const user = await userRepository.findUserById(userId)
            if (!user) {
                console.error("GetUserService: User not found")
                return res.status(404).send("GetUserService: User not found")
            }

            console.info(`GetUserService: User found ${user.first_name}`)

            return res.status(200).json({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
            } as I_User)
        } catch (error) {
            console.error(`GetUserService: ${error}`)
            return res.status(500).send("GetUserService: Internal")
        }
    }
}

const userService = new UserService()
export default userService