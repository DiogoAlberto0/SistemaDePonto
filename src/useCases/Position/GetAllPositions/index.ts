import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { GetAllPositionsController } from "./GetAllPositionsController";
import { GetAllPositionsUseCase } from "./GetAllPositionsUseCase";

const positionRepository = new InMemoryPositionRepository()

const getAllPositionsUseCase = new GetAllPositionsUseCase(positionRepository)

export const getAllPositionsController = new GetAllPositionsController(getAllPositionsUseCase)