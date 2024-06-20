import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { DateUtils } from "../../../utils/date/implementation/DateUtils";
import { SetMedicalCertificateController } from "./SetMedicalCertificateController";
import { SetMedicalCertificateUseCase } from "./SetMedicalCertificateUseCase";


const dateUtils = new DateUtils()

const timeSheetRepository = new InMemoryTimeSheetRepository()
const userRepository = new InMemoryUserDatabase()
const positionRepository = new InMemoryPositionRepository()

const setMedicalCertificateUseCase = new SetMedicalCertificateUseCase(timeSheetRepository, userRepository, positionRepository, dateUtils)

export const setMedicalCertificateController = new SetMedicalCertificateController(setMedicalCertificateUseCase)