import HttpException from "./http-exception.ts";
import {HttpStatus} from "../../config/consts.ts";

class BadRequest400Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.BadRequest,
        })
    }
}

export default BadRequest400Exception