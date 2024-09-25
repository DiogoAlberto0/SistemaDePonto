import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaStationRepository } from "../../../repositories/prismaImplementation/prismaStationRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";


const userRepository = new PrismaUserRepository()
const stationRepository = new PrismaStationRepository()
const positionRepository = new PrismaPositionRepository()
const passwordUtils = new PasswordUtils()

export const createUserUseCase = new CreateUserUseCase(userRepository, passwordUtils, stationRepository, positionRepository)

const createUserController = new CreateUserController(createUserUseCase)


export { createUserController }
