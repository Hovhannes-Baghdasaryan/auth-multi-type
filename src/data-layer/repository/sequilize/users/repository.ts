import {UserModal} from "../../../models/sequilize";
import sequelize from "../../../../config/sequelize.ts";
import {UserAttribute, UserInstance} from "../../../models/sequilize/users/types.ts";
import {I_UserUpdatePayload} from "../../../../api/dto/request/userRequestDto.ts";

class UserRepository {
    private readonly _userRepository = UserModal(sequelize)

    async findAllUsers(page = 1, per_page = 10): Promise<{ rows: UserInstance[], count: number }> {
        const offset = (page - 1) * per_page
        return await this._userRepository.findAndCountAll({limit: per_page, offset})
    }

    async findUserById(id: number): Promise<UserInstance | null> {
        return await this._userRepository.findByPk(id)
    }

    async findUserByUsername(username: string): Promise<UserInstance | null> {
        return await this._userRepository.findOne({where: {username}})
    }

    async createNewUser(username: string, newOtp?: string): Promise<UserInstance | null> {
        return await this._userRepository.create({username, otp: newOtp})
    }

    async verifiedUser(id: number, verifiedUserPayload: I_UserUpdatePayload): Promise<UserAttribute> {
        const [rowsUpdated, [updatedUser]] = await this._userRepository.update({
            otp: null,
            isVerified: true,
            first_name: verifiedUserPayload.first_name,
            last_name: verifiedUserPayload.last_name
        }, {where: {id}, returning: true})

        console.info(`UsersUpdateRepository: ${rowsUpdated} rows updated`);

        return updatedUser.toJSON()
    }

    async updateOtp(id: number, newOtp: string): Promise<void> {
        await this._userRepository.update({otp: newOtp, isVerified: false}, {where: {id}})
    }
}

const userRepository = new UserRepository()
export default userRepository