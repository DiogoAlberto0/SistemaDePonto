
export interface IToken {
    generateToken(payload: { userId: string }, expirationTime: number): string
    validateToken(token: string): { userId: string | undefined }
}