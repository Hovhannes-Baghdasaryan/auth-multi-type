import {body, ValidationChain} from 'express-validator'
import {E_AUTH_TYPE} from "../../config/consts.ts";
import {AUTH_TYPE} from "../../config/env.ts";

export const loginVerifyValidator = () => {
    const validationArr: ValidationChain[] = []

    switch (AUTH_TYPE) {
        case E_AUTH_TYPE.EMAIL:
            validationArr.push(
                body('username').isEmail().withMessage("username must be email"),
                body("otp").optional().isNumeric().withMessage("OTP must be type of number")
            );
            break
        case E_AUTH_TYPE.PHONE:
            validationArr.push(
                body('username').isMobilePhone("am-AM").withMessage("username must be valid phone number"),
                body('otp').optional().isNumeric().withMessage("OTP must be number")
            )
            break
        case E_AUTH_TYPE.NICKNAME:
            return body('username').isString().withMessage("must be as string")
    }

    return validationArr.concat(
        body('first_name').optional().isString().withMessage("first_name must be  string"),
        body('last_name').optional().isString().withMessage("last_name must be string")
    )
}