import {body} from 'express-validator'
import {AUTH_TYPE} from "../../config/env.ts";
import {E_AUTH_TYPE} from "../../config/consts.ts";

// firstname, lastname and otp are optional
export const loginVerifyValidator = () => {
    switch (AUTH_TYPE) {
        case E_AUTH_TYPE.EMAIL:
            return body('username').isEmail();
        case E_AUTH_TYPE.PHONE:
            return body('username').isMobilePhone("am-AM")
        case E_AUTH_TYPE.NICKNAME:
            return body('username').isString()
    }
}
