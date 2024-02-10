import {transporter} from "../../config/mail.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {otpGenerate} from "../../common/util";
import {hashUtil} from "../../common/util";
import client from "../../config/twilio.ts";

class CodeService {
    async sendOtp(username: string, authType: E_AUTH_TYPE): Promise<string> {
        try {
            const newOtp = otpGenerate()

            switch (authType) {
                case E_AUTH_TYPE.EMAIL:
                    await transporter.sendMail({
                        to: username,
                        subject: 'WELCOME: AUTHORIZE WITH E-MAIL',
                        text: `Code: ${newOtp}`
                    })
                    break

                case E_AUTH_TYPE.PHONE:
                    await client.messages.create({
                        body: `Code: ${newOtp}`,
                        to: `+${username}`,
                        from: process.env.TWILIO_PHONE_NUMBER
                    })
            }

            console.info("OTP sent successfully")

            return hashUtil.hash(newOtp)
        } catch (error) {
            console.error(error)
            throw new Error(`sendOtpCodeService: OTP not sent`)
        }
    }
}

const codeService = new CodeService()
export default codeService