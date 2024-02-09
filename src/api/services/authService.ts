import {Response} from "express"
import codeService from "./codeService.ts";
import {AUTH_TYPE} from "../../config/env.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {I_User, I_UserVerifyOtpPayload} from "../dto/userDto.ts";
import {userRepository} from "../../data-layer/repository/sequilize";
import {compareWithEncrypted} from "../../util/hash.ts";

class AuthService {
    async createEntryPointUser(username: string, res: Response): Promise<Response> {
        try {
            const user = await userRepository.findUserByUsername(username)

            switch (AUTH_TYPE) {
                case E_AUTH_TYPE.NICKNAME:
                    if (user) {
                        console.error(`AuthServiceEntryPoint: Already exists${username}`)
                        return res.status(400).json({message: `AuthServiceEntryPoint: User with nickname ${username} already exists`})
                    }

                    await userRepository.createNewUser(username)
                    console.info("User with nickname created successfully")

                    return res.status(200).json({message: `${username}`})

                case E_AUTH_TYPE.PHONE:
                case E_AUTH_TYPE.EMAIL:
                    const otp = await codeService.sendOtp(username, AUTH_TYPE, res)

                    if (!user) {
                        await userRepository.createNewUser(username, otp!)
                    } else {
                        await userRepository.updateOtp(user.id, otp!)
                    }

                    console.info(`New OTP Sent to: ${username}`)

                    return res.status(200).json({message: `New OTP Sent to: ${username}`})
                default:
                    console.info("AuthServiceEntryPoint: Auth Type is not valid")
                    return res.status(500).json({message: "AuthServiceEntryPoint: Auth Type is not valid"})
            }
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

            if(user.isVerified) {
                console.error("AuthServiceLoginVerify: User Already Authorizer")
                return res.status(404).json({message: "User Already Authorizer"})
            }

            if (AUTH_TYPE !== E_AUTH_TYPE.NICKNAME && user.otp) {
                const verifiedOtp = await compareWithEncrypted(verifyUserPayload.otp, user?.otp!)
                if (!verifiedOtp) {
                    console.error("AuthServiceLoginVerify: OTP not valid")
                    return res.status(400).json({message: "OTP Not valid"})
                }
            }

            await userRepository.verifiedUser(user.id, {
                firstName: verifyUserPayload.firstName,
                lastName: verifyUserPayload.lastName
            })

            console.info("AuthServiceLoginVerify: User successfully updated")

            return res.status(200).json({
                id: user.id,
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