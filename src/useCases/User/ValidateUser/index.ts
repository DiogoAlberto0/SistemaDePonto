import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { TokenUtils } from "../../../utils/jwt/implementation/token.utils";
import { ValidateUserController } from "./ValidateUserController";
import { ValidateUserUseCase } from "./ValidateUserUseCase";



const userRepository = new InMemoryUserDatabase()
const positionRepository = new InMemoryPositionRepository()
const tokenUtils = new TokenUtils()

export const validateUserUseCase = new ValidateUserUseCase(userRepository, positionRepository, tokenUtils)

export const validateUserController = new ValidateUserController(validateUserUseCase)