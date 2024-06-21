import { PrismaPositionRepository } from "../../../repositories/prismaImplementation/prismaPositionRepository";
import { PrismaTimeSheetRepository } from "../../../repositories/prismaImplementation/prismaTimeSheetRepository";
import { PrismaUserRepository } from "../../../repositories/prismaImplementation/prismaUserRepository";
import { DateUtils } from "../../../utils/date/implementation/DateUtils";
import { SetMedicalCertificateController } from "./SetMedicalCertificateController";
import { SetMedicalCertificateUseCase } from "./SetMedicalCertificateUseCase";


const dateUtils = new DateUtils()

const timeSheetRepository = new PrismaTimeSheetRepository()
const userRepository = new PrismaUserRepository()
const positionRepository = new PrismaPositionRepository()

const setMedicalCertificateUseCase = new SetMedicalCertificateUseCase(timeSheetRepository, userRepository, positionRepository, dateUtils)

export const setMedicalCertificateController = new SetMedicalCertificateController(setMedicalCertificateUseCase)