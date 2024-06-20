import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { GetAllUsersController } from "./GetAllUsersController";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";


const userRepository = new InMemoryUserDatabase()
const positionRepository = new InMemoryPositionRepository()

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository, positionRepository)

export const getAllUserController = new GetAllUsersController(getAllUsersUseCase)