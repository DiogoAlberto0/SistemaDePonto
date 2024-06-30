import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
import { UpdatePhoneAndPassController } from "./UpdatePhoneAndPassController";
import { UpdatePhoneAndPassUseCase } from "./UpdatePhoneAndPassUseCase";



const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()

const updatePhoneAndPassUseCase = new UpdatePhoneAndPassUseCase(userRepository, positionRepository, new PasswordUtils())

export const updatePhoneAndPassController = new UpdatePhoneAndPassController(updatePhoneAndPassUseCase)