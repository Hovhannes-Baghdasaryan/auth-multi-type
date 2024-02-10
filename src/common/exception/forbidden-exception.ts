import HttpException from "./http-exception.ts";
import {HttpStatus} from "../../config/consts.ts";

class Forbidden403Exception extends HttpException {
    constructor(message: string) {
        super({
            message: message,
            status: HttpStatus.Forbidden,
        })
    }
}

export default  Forbidden403Exception