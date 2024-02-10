import HttpException from "./http-exception.ts";
import {HttpStatus} from "../../config/consts.ts";

class NotFound404Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.NotFound,
        })
    }
}

export default  NotFound404Exception