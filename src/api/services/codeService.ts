import {Response} from "express"
import {transporter} from "../../config/mail.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {otpGenerate} from "../../util";
import {hash} from "../../util/hash.ts";
import client from "../../config/twilio.ts";

class CodeService {
    async sendOtp(username: string, authType: E_AUTH_TYPE, res: Response): Promise<string | undefined> {
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

            return hash(newOtp)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: `sendOtpCodeService: OTP not sent`})
        }
    }
}

const codeService = new CodeService()
export default codeService