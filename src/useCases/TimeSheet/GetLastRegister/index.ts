import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaTimeSheetRepository } from "../../../repositories/prismaImplementation/prismaTimeSheetRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { GetLastRegisterController } from "./GetLastRegisterController";
import { GetLastRegisterUseCase } from "./GetLastRegisterUseCase";

const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()
const timeSheetRepository = new PrismaTimeSheetRepository()

const getLastRegisterUseCase = new GetLastRegisterUseCase(timeSheetRepository, userRepository)

const getLastRegisterController = new GetLastRegisterController(getLastRegisterUseCase)

export { getLastRegisterController }