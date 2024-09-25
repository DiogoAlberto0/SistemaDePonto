import { PrismaStationRepository } from "../../../repositories/prismaImplementation/prismaStationRepository";
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
import { CreateStationController } from "./CreateStationController";
import { CreateStationUseCase } from "./CreateStationUseCase";


const stationRepository = new PrismaStationRepository()

const cnpjUtils = new CnpjUtils()


const createStationUseCase = new CreateStationUseCase(stationRepository, cnpjUtils)

const createStationController = new CreateStationController(createStationUseCase)


export { createStationController }