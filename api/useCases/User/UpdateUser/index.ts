import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";



const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()

const updateUserUseCase = new UpdateUserUseCase(userRepository, positionRepository, new PasswordUtils())

export const updateUserController = new UpdateUserController(updateUserUseCase)