import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { CreatePositionController } from "./CreatePositionController";
import { CreatePositionUseCase } from "./CreatePositionUseCase";


const positionRepository = new InMemoryPositionRepository()

const createPositionUseCase = new CreatePositionUseCase(positionRepository)

const createPositionContoller = new CreatePositionController(createPositionUseCase)

export { createPositionContoller }