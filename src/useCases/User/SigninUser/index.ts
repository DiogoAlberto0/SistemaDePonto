import { SigninUserController } from "./SigninUserController";
import { SigninUserUseCase } from "./SigninUserUseCase";

import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
import { TokenUtils } from "../../../utils/jwt/implementation/token.utils";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";

const userRepository = new PrismaUserRepository()


const passwordUtils = new PasswordUtils()
const tokenUtils = new TokenUtils()

const signinUserUseCase = new SigninUserUseCase(userRepository, passwordUtils, tokenUtils)

const signinUserController = new SigninUserController(signinUserUseCase)


export { signinUserController }