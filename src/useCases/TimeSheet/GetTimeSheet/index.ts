import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { GetTimeSheetController } from "./GetTimeSheetController";
import { GetTimeSheetUseCase } from "./GetTimeSheetUseCase";

const userRepository = new InMemoryUserDatabase()
const positionRepository = new InMemoryPositionRepository()
const timeSheetRepository = new InMemoryTimeSheetRepository()

const getTimeSheetUseCase = new GetTimeSheetUseCase(timeSheetRepository, userRepository, positionRepository)

const getTimeSheetController = new GetTimeSheetController(getTimeSheetUseCase)

export { getTimeSheetController }