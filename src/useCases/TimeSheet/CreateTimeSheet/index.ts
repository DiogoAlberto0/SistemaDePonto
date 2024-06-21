
import { PrismaStationRepository } from "../../../repositories/prismaImplementation/prismaStationRepository";
import { PrismaTimeSheetRepository } from "../../../repositories/prismaImplementation/prismaTimeSheetRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { CoordUtils } from "../../../utils/coord/implementation/coordUtils";
import { CreateTimeSheetController } from "./CreateTimeSheetController";
import { CreateTimeSheetUseCase } from "./CreateTimeSheetUseCase";


const timeSheetRepository = new PrismaTimeSheetRepository()
const userRepository = new PrismaUserRepository()
const stationRepository = new PrismaStationRepository()

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