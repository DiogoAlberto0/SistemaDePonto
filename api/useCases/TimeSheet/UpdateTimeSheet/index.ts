import { UpdateTimeSheetController } from "./UpdateTimeSheetController";
import { UpdateTimeSheetuseCase } from "./UpdateTimeSheetUseCase";
import { PrismaTimeSheetRepository } from "../../../repositories/prismaImplementation/prismaTimeSheetRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";


const timeSheetRepository = new PrismaTimeSheetRepository()
const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()

const updateTimeSheetUseCase = new UpdateTimeSheetuseCase(timeSheetRepository, userRepository, positionRepository)

export const updateTimeSheetController = new UpdateTimeSheetController(updateTimeSheetUseCase)