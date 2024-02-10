import {AllUsersPaginatedDto, UserResponseDto} from "../dto/response/userResponseDto.ts";
import {ResponseDto} from "../../common/dto/response.ts";
import {userRepository} from "../../data-layer/repository/sequilize";
import {I_PaginatedResponse, I_Pagination} from "../../common/dto/pagination.ts";
import {Internal500Exception, NotFound404Exception} from "../../common/exception";
import {handleError} from "../../common/helpers";

class UserService {
    async getUser(userId: number): Promise<ResponseDto<UserResponseDto>> {
        try {
            const user = await userRepository.findUserById(userId)
            if (!user) {
                console.error(`GetUserService: User not found ${userId}`)
                throw new NotFound404Exception("GetUserService: User not found")
            }

            console.info(`GetUserService: User found ${user.username}`)

            return new ResponseDto({
                message: 'Get Single User Successfully',
                data: new UserResponseDto(user)
            })
        } catch (error: any) {
            console.error(`GetUserService: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_SINGLE_USER INTERNAL")
        }
    }

    async getAllUsers(query: I_Pagination): Promise<ResponseDto<I_PaginatedResponse<UserResponseDto>>> {
        try {
            const results = await userRepository.findAllUsers(query.page, query.per_page)

            console.info(`GetAllUsersService Successfully`)

            return new ResponseDto({
                message: 'Get All Users Successfully',
                data: new AllUsersPaginatedDto({items: results.rows, total: results.count})
            })
        } catch (error: any) {
            console.error(`GetAllUsersService: ${error}`)
            handleError(error)
            throw new Internal500Exception("GET_ALL_USERS INTERNAL")
        }
    }
}

const userService = new UserService()
export default userService