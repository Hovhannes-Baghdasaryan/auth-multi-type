import {Response} from "express"
import {transporter} from "../../config/mail.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {otpGenerate} from "../../util";
import {compareWithEncrypted, hash} from "../../util/hash.ts";
import {AUTH_TYPE} from "../../config/env.ts";

class CodeService {
    async sendOtp(login: string, authType: E_AUTH_TYPE, res: Response): Promise<string | undefined> {
        try {
            const newOtp = otpGenerate()

            switch (authType) {
                case E_AUTH_TYPE.EMAIL:
                    await transporter.sendMail({
                        to: login,
                        subject: 'WELCOME: AUTHORIZE WITH E-MAIL',
                        text: `Code: ${newOtp}`
                    })

                    console.info("Mail sent successfully")
            }

            return hash(newOtp)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: `sendMailOtpCodeService: mail not sent`})
        }
    }
}

const codeService = new CodeService()
export default codeService