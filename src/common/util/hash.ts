import bcrypt from 'bcryptjs'

const hash = (password: string): Promise<string> => {
    return bcrypt.hash(password, Number(process.env.PASS_HASH))
}

const compareWithEncrypted = (data: string, encrypted: string): Promise<boolean> => {
    return bcrypt.compare(data, encrypted)
}

export default {
    compareWithEncrypted,
    hash
}