import {UserModal} from "../../../models/sequilize";
import sequelize from "../../../../config/sequelize.ts";
import {UserInstance} from "../../../models/sequilize/users/types.ts";
import {I_UserUpdatePayload} from "../../../../api/dto/userDto.ts";

class UserRepository {
    private readonly _userRepository = UserModal(sequelize)

    async findUserById(userId: number): Promise<UserInstance | null> {
        return await this._userRepository.findByPk(userId)
    }

    async findUserByUsername(username: string): Promise<UserInstance | null> {
        return await this._userRepository.findOne({where: {username}})
    }

    async createNewUser(username: string, newOtp?: string): Promise<UserInstance | null> {
        return await this._userRepository.create({username, otp: newOtp})
    }

    async verifiedUser(userId: number, verifiedUserPayload: I_UserUpdatePayload): Promise<void> {
        await this._userRepository.update({
            isVerified: true,
            first_name: verifiedUserPayload.firstName,
            last_name: verifiedUserPayload.lastName,
            otp: null
        }, {where: {id: userId}})
    }

    async updateOtp(userId: number, newOtp: string): Promise<void> {
        await this._userRepository.update({otp: newOtp, isVerified: false}, {where: {id: userId}})
    }
}

const userRepository = new UserRepository()
export default userRepository