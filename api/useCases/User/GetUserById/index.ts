import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";


const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()

const getUserByIdUseCase = new GetUserByIdUseCase(userRepository, positionRepository)

export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)