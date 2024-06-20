import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { CoordUtils } from "../../../utils/coord/implementation/coordUtils";
import { CreateTimeSheetController } from "./CreateTimeSheetController";
import { CreateTimeSheetUseCase } from "./CreateTimeSheetUseCase";


const timeSheetRepository = new InMemoryTimeSheetRepository()
const userRepository = new InMemoryUserDatabase()
const stationRepository = new InMemoryStationDatabase()

const coordUtils = new CoordUtils()

const createTimeSheetUseCase = new CreateTimeSheetUseCase(
    timeSheetRepository,
    userRepository,
    stationRepository,
    coordUtils
)

const createTimeSheetController = new CreateTimeSheetController(
    createTimeSheetUseCase
)

export { createTimeSheetController }