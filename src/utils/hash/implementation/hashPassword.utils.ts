import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { IHashPassword } from "../IHashPassword";


export class HashPassword implements IHashPassword {
    hash(password: string): string {
        const salt = genSaltSync(10)
        return hashSync(password, salt)
    }
    compareHash(password: string, hash: string): boolean {
        return compareSync(password, hash)
    }
}