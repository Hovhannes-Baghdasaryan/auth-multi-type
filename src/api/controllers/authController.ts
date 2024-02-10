import {Request, Response} from 'express'
import {authService} from "../services";
import {validationResult} from 'express-validator'
import {ResponseDto} from "../../common/dto/response.ts";
import {UserResponseDto} from "../dto/response/userResponseDto.ts";
import {ExceptionDto} from "../../common/dto/exception.ts";
import {BadRequest400Exception} from "../../common/exception";

class AuthController {
    async entryPoint(req: Request, res: Response): Promise<Response<ResponseDto<void>>> {
        try {
            const valResult = validationResult(req)

            if (!valResult.isEmpty()) {
                console.error("EntryPointLoginController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const username = req.body.username

            const response = await authService.createEntryPointUser(username)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error("EntryPointLoginController: Error")
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }

    async loginVerify(req: Request, res: Response): Promise<Response<ResponseDto<UserResponseDto>>> {
        try {
            const valResult = validationResult(req)

            if (!valResult.isEmpty()) {
                console.error("LoginVerifyController: Validation")
                throw new BadRequest400Exception(valResult.array({onlyFirstError: true})[0].msg)
            }

            const response = await authService.verifyUser(req.body)
            return res.status(200).json(response)
        } catch (error: any) {
            console.error("LoginVerifyController: Error")
            return res.status(error.status).json(new ExceptionDto(error))
        }
    }
}

const authController = new AuthController();
export default authController;
