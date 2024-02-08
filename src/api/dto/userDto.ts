export interface I_User {
    id: number;
    firstName: string | null;
    lastName: string | null;
}

export interface I_UserVerifyOtpPayload {
    username: string
    firstName?: string;
    lastName?: string;
    otp: string;
}

export interface I_UserUpdatePayload {
    firstName?: string;
    lastName?: string;
}

