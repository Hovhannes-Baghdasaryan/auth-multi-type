import { config } from 'dotenv'
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
