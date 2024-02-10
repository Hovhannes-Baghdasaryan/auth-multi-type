import HttpException from "./http-exception.ts";
import {HttpStatus} from "../../config/consts.ts";

class Internal500Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.Internal,
        })
    }
}

export default  Internal500Exception