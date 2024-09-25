import { IToken } from "../IToken";

import { sign, decode, verify, JwtPayload } from 'jsonwebtoken'


interface PayloadProps {
    userId: string | undefined;
}
export class TokenUtils implements IToken {
    generateToken(payload: PayloadProps, expirationTimeInHours: number): string {

        const token = sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: 60 * 60 * expirationTimeInHours })

        return token
    }
    validateToken(token: string): PayloadProps {
        try {
            const payload = verify(token, `${process.env.JWT_SECRET}`) as JwtPayload
            
            return ({
                userId: payload?.userId || undefined
            })
        } catch (error) {
            return ({
                userId: undefined
            })
        }

    }
}