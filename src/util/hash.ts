import bcrypt from 'bcryptjs'

export const hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, Number(process.env.PASS_HASH))
}

export function compareWithEncrypted(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted)
}
