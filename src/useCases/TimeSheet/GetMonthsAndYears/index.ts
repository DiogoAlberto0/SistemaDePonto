import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { GetMonthsAndYearsController } from "./GetMonthsAndYearsController";
import { GetMonthsAndYearsUseCase } from "./GetMonthsAndYearsUseCase";


const userRepository = new InMemoryUserDatabase()
const timeSheetRepository = new InMemoryTimeSheetRepository()
const positionRepository = new InMemoryPositionRepository()

const getMonthsAndYearsUseCase = new GetMonthsAndYearsUseCase(userRepository, positionRepository, timeSheetRepository )


export const getMonthsAndYearsController = new GetMonthsAndYearsController(getMonthsAndYearsUseCase)