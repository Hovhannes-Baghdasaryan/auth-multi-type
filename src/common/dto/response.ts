interface I_Response<T> {
    message: string;
    data?: T
}

export class ResponseDto<T> {
    constructor(response: I_Response<T>) {
        this.message = response.message
        if (response.data) {
            this.data = response.data
        }
    }

    message: string;
    data?: T
}