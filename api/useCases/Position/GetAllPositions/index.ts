import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { GetAllPositionsController } from "./GetAllPositionsController";
import { GetAllPositionsUseCase } from "./GetAllPositionsUseCase";

const positionRepository = new PrismaPositionRepository()

const getAllPositionsUseCase = new GetAllPositionsUseCase(positionRepository)

export const getAllPositionsController = new GetAllPositionsController(getAllPositionsUseCase)