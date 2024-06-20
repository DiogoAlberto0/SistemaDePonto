import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { HashPassword } from "../../../utils/hash/implementation/hashPassword.utils";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";


const inMemoryUserDatabase = new InMemoryUserDatabase()
const inMemoryStationRepository = new InMemoryStationDatabase()
const positionRepository = new InMemoryPositionRepository()
const hashPassword = new HashPassword()

export const createUserUseCase = new CreateUserUseCase(inMemoryUserDatabase, hashPassword, inMemoryStationRepository, positionRepository)

const createUserController = new CreateUserController(createUserUseCase)


export { createUserController }
