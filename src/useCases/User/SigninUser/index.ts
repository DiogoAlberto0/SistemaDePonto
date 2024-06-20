import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { SigninUserController } from "./SigninUserController";
import { SigninUserUseCase } from "./SigninUserUseCase";

import { HashPassword } from "../../../utils/hash/implementation/hashPassword.utils";
import { TokenUtils } from "../../../utils/jwt/implementation/token.utils";

const inMemoryUserDatabase = new InMemoryUserDatabase()


const hashPassword = new HashPassword()
const tokenUtils = new TokenUtils()

export const signinUserUseCase = new SigninUserUseCase(inMemoryUserDatabase, hashPassword, tokenUtils)

const signinUserController = new SigninUserController(signinUserUseCase)


export { signinUserController }