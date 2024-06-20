import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { UpdatePositionController } from "./UpdatePositionController";
import { UpdatePositionUseCase } from "./UpdatePositionUseCase";


const positionRepository = new InMemoryPositionRepository()

const updatePositionUseCase = new UpdatePositionUseCase(positionRepository)

const updatePositionContoller = new UpdatePositionController(updatePositionUseCase)

export { updatePositionContoller }