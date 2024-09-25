import { PrismaStationRepository } from "../../../repositories/prismaImplementation/prismaStationRepository";
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
import { UpdateStationController } from "./UpdateStationController";
import { UpdateStationUseCase } from "./UpdateStationUseCase";


const stationRepository = new PrismaStationRepository()

const cnpjUtils = new CnpjUtils()


const updateStationUseCase = new UpdateStationUseCase(stationRepository, cnpjUtils)

const updateStationController = new UpdateStationController(updateStationUseCase)


export { updateStationController }