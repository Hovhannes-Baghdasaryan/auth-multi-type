import codeService from "./codeService.ts";
import {AUTH_TYPE} from "../../config/env.ts";
import {handleError} from "../../common/helpers";
import {hashUtil} from "./../../common/util"
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {ResponseDto} from "../../common/dto/response.ts";
import {UserResponseDto} from "../dto/response/userResponseDto.ts";
import {userRepository} from "../../data-layer/repository/sequilize";
import {I_UserVerifyOtpPayload} from "../dto/request/userRequestDto.ts";
import {
    NotFound404Exception,
    BadRequest400Exception,
    Forbidden403Exception,
    Internal500Exception
} from "../../common/exception";

class AuthService {
    async createEntryPointUser(username: string): Promise<ResponseDto<void>> {
        try {
            const user = await userRepository.findUserByUsername(username)

            switch (AUTH_TYPE) {
                case E_AUTH_TYPE.NICKNAME:
                    if (user) {
                        console.error(`AuthServiceEntryPoint: Already exists${username}`)
                        throw new Error(`AuthServiceEntryPoint: User with nickname ${username} already exists`)
                    }

                    await userRepository.createNewUser(username)
                    console.info("User with nickname created successfully")

                    return new ResponseDto({message: `User ${username} registered`})

                case E_AUTH_TYPE.PHONE:
                case E_AUTH_TYPE.EMAIL:
                    const otp = await codeService.sendOtp(username, AUTH_TYPE)

                    if (!user) {
                        await userRepository.createNewUser(username, otp)
                    } else {
                        await userRepository.updateOtp(user.id, otp)
                    }

                    console.info(`New OTP Sent to: ${username}`)

                    return new ResponseDto({message: `New OTP Sent to: ${username}`})
                default:
                    console.info("AuthServiceEntryPoint: Auth Type is not valid")
                    throw new BadRequest400Exception("AuthServiceEntryPoint: Auth Type is not valid")
            }
        } catch (error: any) {
            console.error(`AuthServiceEntryPoint: ${error}`)
            handleError(error)
            throw new Internal500Exception("AUTH_ENTRY_POINT_USER INTERNAL")
        }
    }

    async verifyUser(verifyUserPayload: I_UserVerifyOtpPayload): Promise<ResponseDto<UserResponseDto>> {
        try {
            const user = await userRepository.findUserByUsername(verifyUserPayload.username)
            if (!user) {
                console.error("AuthServiceLoginVerify: User not found")
                throw new NotFound404Exception("User not found")
            }

            if (user.isVerified) {
                console.error("AuthServiceLoginVerify: User Already Authorized")
                throw new Forbidden403Exception("User Already Authorized")
            }

            if (AUTH_TYPE !== E_AUTH_TYPE.NICKNAME && user.otp) {
                const verifiedOtp = await hashUtil.compareWithEncrypted(verifyUserPayload.otp.toString(), user.otp)
                if (!verifiedOtp) {
                    console.error("AuthServiceLoginVerify: OTP not valid")
                    throw new BadRequest400Exception("OTP not valid")
                }
            }

            const updatedUser = await userRepository.verifiedUser(user.id, {
                first_name: verifyUserPayload.first_name,
                last_name: verifyUserPayload.last_name
            })

            console.info("AuthServiceLoginVerify: User successfully updated")

            return new ResponseDto({
                message: `${verifyUserPayload.username} has been Verified Successfully`,
                data: new UserResponseDto(updatedUser)
            })
        } catch (error: any) {
            console.error(`AuthServiceLoginVerify: ${error}`)
            handleError(error)
            throw new Internal500Exception("AUTH_VERIFY_USER INTERNAL")
        }
    }
}

const authService = new AuthService()
export default authService