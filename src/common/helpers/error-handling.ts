import {BadRequest400Exception, NotFound404Exception} from "../exception";
import ForbiddenException from "../exception/forbidden-exception.ts";

const handleError = (error: Error): void => {
    const exceptions = [
        NotFound404Exception,
        BadRequest400Exception,
        ForbiddenException
    ]

    // handle instantiated errors for throwing the exceptions of the same type as the input error
    for (const exceptionType of exceptions) {
        if (error instanceof exceptionType) {
            throw error
        }
    }
}

export default handleError
