import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { GetAllUsersController } from "./GetAllUsersController";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";


const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository, positionRepository)

export const getAllUserController = new GetAllUsersController(getAllUsersUseCase)