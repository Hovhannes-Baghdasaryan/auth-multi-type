import { config } from 'dotenv'
import {E_AUTH_TYPE} from "./consts.ts";
config()

const getEnvVar = (key: string, required = true): string => {
    if (!Object.prototype.hasOwnProperty.call(process.env, key) && required) {
        throw new Error(`${key} does not exist on process.env`)
    }

    return process.env[key]!
}

export const PORT = getEnvVar('PORT', false) ?? 3000

export const DB_HOST = getEnvVar('DB_HOST')
export const DB_PORT = getEnvVar('DB_PORT')
export const DB_NAME = getEnvVar('DB_NAME')
export const DB_USER = getEnvVar('DB_USER')
export const DB_PASSWORD = getEnvVar('DB_PASSWORD')

export const MAIL_HOST = getEnvVar('MAIL_HOST')
export const MAIL_PORT = getEnvVar('MAIL_PORT')
export const MAIL_USER = getEnvVar('MAIL_USER')
export const MAIL_PASSWORD = getEnvVar('MAIL_PASSWORD')
export const MAIL_FROM = getEnvVar('MAIL_FROM')

export const AUTH_TYPE = getEnvVar('AUTH_TYPE') as E_AUTH_TYPE
