import {userService} from '../services'
import {Request, Response} from 'express'
import {validationResult} from "express-validator";
import {ResponseDto} from "../../common/dto/response.ts";
import {UserResponseDto} from "../dto/response/userResponseDto.ts";
import {ExceptionDto, I_Exception} from "../../common/dto/exception.ts";
import {I_PaginatedResponse} from "../../common/dto/pagination.ts";
import {BadRequest400Exception} from "../../common/exception";

class UserController {
    async getUser(req: Request, res: Response): Promise<Response<ResponseDto<UserResponseDto>>> {
        try {
            const valResult = validationResult(req)

            if (!valResult.isEmpty()) {
                console.error("GetUserController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }
            const userId = req.params.id

            const response = await userService.getUser(Number(userId))
            return res.status(200).json(response)
        } catch (error: any) {
            console.error("GetUserController: Error")
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response<ResponseDto<I_PaginatedResponse<UserResponseDto>>>> {
        try {
            const valResult = validationResult(req)

            if (!valResult.isEmpty()) {
                console.error("GetAllUsersController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const response = await userService.getAllUsers(req.query)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error("GetAllUsersController: Error")
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const userController = new UserController();
export default userController;
