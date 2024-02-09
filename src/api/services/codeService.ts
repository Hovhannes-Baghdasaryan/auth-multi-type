import {Response} from "express"
import {transporter} from "../../config/mail.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {otpGenerate} from "../../util";

class CodeService {
    async sendOtp(login: string, authType: E_AUTH_TYPE, res: Response): Promise<string | undefined> {
        try {
            switch (authType) {
                case E_AUTH_TYPE.EMAIL:
                    const newOtp = otpGenerate()

                    await transporter.sendMail({
                        to: login,
                        subject: 'WELCOME: AUTHORIZE WITH E-MAIL',
                        text: `Code: ${newOtp}`
                    })

                    console.info("Mail sent successfully")

                    return newOtp
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({error: `sendMailOtpCodeService: mail not sent`})
        }
    }

    async verifyOtp(login: string, res: Response) {
        try {

        } catch (error) {
            res.status(500).json({message: `verifyOtpCodeService: Internal`})
        }
    }
}

const codeService = new CodeService()
export default codeService