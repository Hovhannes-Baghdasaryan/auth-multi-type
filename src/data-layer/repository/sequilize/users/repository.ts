import {UserModal} from "../../../models/sequilize";
import sequelize from "../../../../config/sequelize.ts";
import {I_UserById} from "./dto.ts";

class UserRepository {
    _userRepository = UserModal(sequelize)

    async getUserById(userId: number): Promise<I_UserById | null> {
        return await this._userRepository.findByPk(userId)
    }
}

const userRepository = new UserRepository()
export default userRepository