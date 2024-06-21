import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { TokenUtils } from "../../../utils/jwt/implementation/token.utils";
import { ValidateUserController } from "./ValidateUserController";
import { ValidateUserUseCase } from "./ValidateUserUseCase";



const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()
const tokenUtils = new TokenUtils()

export const validateUserUseCase = new ValidateUserUseCase(userRepository, positionRepository, tokenUtils)

export const validateUserController = new ValidateUserController(validateUserUseCase)