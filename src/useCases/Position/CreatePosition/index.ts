import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { CreatePositionController } from "./CreatePositionController";
import { CreatePositionUseCase } from "./CreatePositionUseCase";


const positionRepository = new PrismaPositionRepository()

const createPositionUseCase = new CreatePositionUseCase(positionRepository)

const createPositionContoller = new CreatePositionController(createPositionUseCase)

export { createPositionContoller }