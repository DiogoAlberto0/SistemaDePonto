import { PrismaStationRepository } from "../../../repositories/prismaImplementation/prismaStationRepository";
import { GetAllStationsController } from "./GetAllStationsController";
import { GetAllStationsUseCase } from "./GetAllStationsUseCase";

const stationRepository = new PrismaStationRepository()

const getAllStationsUseCase = new GetAllStationsUseCase(stationRepository)

export const getAllStationsController = new GetAllStationsController(getAllStationsUseCase)