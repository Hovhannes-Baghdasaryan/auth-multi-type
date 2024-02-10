export interface I_Exception {
    message: string;
    status: number
}

export class ExceptionDto {
    constructor(response: I_Exception) {
        this.message = response.message
        this.status = response.status
    }

    message: string;
    status: number
}
