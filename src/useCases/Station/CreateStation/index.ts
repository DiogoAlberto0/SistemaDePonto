import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
import { CreateStationController } from "./CreateStationController";
import { CreateStationUseCase } from "./CreateStationUseCase";


const inMemoryStationDatabase = new InMemoryStationDatabase()

const cnpjUtils = new CnpjUtils()


const createStationUseCase = new CreateStationUseCase(inMemoryStationDatabase, cnpjUtils)

const createStationController = new CreateStationController(createStationUseCase)


export { createStationController }