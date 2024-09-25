import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { GetPrivillegeLevelControler } from "./GetPrivillegeLevelController";
import { GetPrivillegeLevelUseCase } from "./GetPrivillegeLevelUseCase";





const positionRepository = new PrismaPositionRepository()
const userRepository = new PrismaUserRepository()


const getPrivillegeLevelUseCase = new GetPrivillegeLevelUseCase(userRepository, positionRepository)

export const getPrivillegeLevelController = new GetPrivillegeLevelControler(getPrivillegeLevelUseCase)