
export interface IPasswordUtils {
    hash(password: string): string
    compareHash(password: string, hash: string): boolean
    validatePassword(password: string): boolean
}