import nodemailer from 'nodemailer'
import {MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER} from "./env.ts";

export const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: false,
    from: MAIL_FROM,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    }
});
