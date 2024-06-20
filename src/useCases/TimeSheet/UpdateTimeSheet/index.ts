import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { UpdateTimeSheetController } from "./UpdateTimeSheetController";
import { UpdateTimeSheetuseCase } from "./UpdateTimeSheetUseCase";


const timeSheetRepository = new InMemoryTimeSheetRepository()
const userRepository = new InMemoryUserDatabase()
const positionRepository = new InMemoryPositionRepository()

const updateTimeSheetUseCase = new UpdateTimeSheetuseCase(timeSheetRepository, userRepository, positionRepository)

export const updateTimeSheetController = new UpdateTimeSheetController(updateTimeSheetUseCase)