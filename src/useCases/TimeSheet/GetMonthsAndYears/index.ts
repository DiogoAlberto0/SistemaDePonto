import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaTimeSheetRepository } from "../../../repositories/prismaImplementation/prismaTimeSheetRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { GetMonthsAndYearsController } from "./GetMonthsAndYearsController";
import { GetMonthsAndYearsUseCase } from "./GetMonthsAndYearsUseCase";


const userRepository = new PrismaUserRepository()
const timeSheetRepository = new PrismaTimeSheetRepository()
const positionRepository = new PrismaPositionRepository()

const getMonthsAndYearsUseCase = new GetMonthsAndYearsUseCase(userRepository, positionRepository, timeSheetRepository )


export const getMonthsAndYearsController = new GetMonthsAndYearsController(getMonthsAndYearsUseCase)