
export interface IHashPassword {
    hash(password: string): string
    compareHash(password: string, hash: string): boolean
}