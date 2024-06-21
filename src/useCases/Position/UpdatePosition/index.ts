import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { UpdatePositionController } from "./UpdatePositionController";
import { UpdatePositionUseCase } from "./UpdatePositionUseCase";


const positionRepository = new PrismaPositionRepository()

const updatePositionUseCase = new UpdatePositionUseCase(positionRepository)

const updatePositionContoller = new UpdatePositionController(updatePositionUseCase)

export { updatePositionContoller }