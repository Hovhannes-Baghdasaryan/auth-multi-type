import {Response} from "express"
import codeService from "./codeService.ts";
import {AUTH_TYPE} from "../../config/env.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {I_User, I_UserVerifyOtpPayload} from "../dto/userDto.ts";
import {userRepository} from "../../data-layer/repository/sequilize";

class AuthService {
    async createEntryPointUser(username: string, res: Response): Promise<Response> {
        try {
            const user = await userRepository.findUserByUsername(username)

            if (AUTH_TYPE === E_AUTH_TYPE.NICKNAME) {
                if(!user) {
                    await userRepository.createNewUser(username)
                    console.log("User with nickname created successfully")
                }

                return res.status(200).json({message: `${username}`})
            }

            const otp = await codeService.sendOtp(username, AUTH_TYPE, res)

            if (!user) {
                await userRepository.createNewUser(username, otp)
            } else {
                await userRepository.resendOtpUpdate(user.id, otp!)
            }

            console.info(`New Otp Sent to: ${username}`)

            return res.status(200).json({message: `New Otp Sent to: ${username}`})
        } catch (error) {
            console.error(`AuthServiceEntryPoint: ${error}`)
            return res.status(500).json({message: `AuthServiceEntryPoint: Internal`})
        }
    }

    async verifyUser(verifyUserPayload: I_UserVerifyOtpPayload, res: Response): Promise<Response<I_User>> {
        try {
            const user = await userRepository.findUserByUsername(verifyUserPayload.username)
            if (!user) {
                console.error("AuthServiceLoginVerify: User not found")
                return res.status(404).json({message: "User not found"})
            }

            if (user?.otp !== verifyUserPayload.otp) {
                console.error("AuthServiceLoginVerify: OTP not valid")
                return res.status(400).json({message: "Otp Not valid"})
            }

            await userRepository.verifiedUser(user.id, {
                firstName: verifyUserPayload.firstName,
                lastName: verifyUserPayload.lastName
            })

            return res.status(200).json({
                id: 5,
                firstName: verifyUserPayload.firstName,
                lastName: verifyUserPayload.lastName,
            } as I_User)
        } catch (error) {
            console.error(`AuthServiceLoginVerify: ${error}`)
            return res.status(500).json({message: `AuthServiceLoginVerify: Internal`})
        }
    }
}

const authService = new AuthService()
export default authService