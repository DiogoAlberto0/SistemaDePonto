import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { IPasswordUtils } from "../IPasswordUtils";


export class PasswordUtils implements IPasswordUtils {
    hash(password: string): string {
        const salt = genSaltSync(10)
        return hashSync(password, salt)
    }
    compareHash(password: string, hash: string): boolean {
        return compareSync(password, hash)
    }

    validatePassword(password: string): boolean {
        const minLength = 10;
        const hasNumber = /[0-9]/;
        const hasLetter = /[a-zA-Z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>[\]\/\\+=-_'`~;|]/;

        if (password.length < minLength) {
            return false;
        }
        if (!hasNumber.test(password)) {
            return false;
        }
        if (!hasLetter.test(password)) {
            return false;
        }
        if (!hasSpecialChar.test(password)) {
            return false;
        }

        return true;
    }
}