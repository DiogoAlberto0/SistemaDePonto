import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaTimeSheetRepository } from "../../../repositories/prismaImplementation/prismaTimeSheetRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { GetTimeSheetController } from "./GetTimeSheetController";
import { GetTimeSheetUseCase } from "./GetTimeSheetUseCase";

const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()
const timeSheetRepository = new PrismaTimeSheetRepository()

const getTimeSheetUseCase = new GetTimeSheetUseCase(timeSheetRepository, userRepository, positionRepository)

const getTimeSheetController = new GetTimeSheetController(getTimeSheetUseCase)

export { getTimeSheetController }