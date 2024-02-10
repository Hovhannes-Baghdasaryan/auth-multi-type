export interface I_UserVerifyOtpPayload {
    username: string
    first_name?: string;
    last_name?: string;
    otp: number;
}

export interface I_UserUpdatePayload {
    first_name?: string;
    last_name?: string;
}
