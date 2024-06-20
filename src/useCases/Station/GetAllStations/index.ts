import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { GetAllStationsController } from "./GetAllStationsController";
import { GetAllStationsUseCase } from "./GetAllStationsUseCase";

const stationRepository = new InMemoryStationDatabase()

const getAllStationsUseCase = new GetAllStationsUseCase(stationRepository)

export const getAllStationsController = new GetAllStationsController(getAllStationsUseCase)