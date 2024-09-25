import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { ITimeSheetRepository } from "../../../repositories/ITimeSheetRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IDateUtils } from "../../../utils/date/IDateUtils";
import { ISetMedicalCertificateDTO } from "./SetMedicalCertificateDTO";



export class SetMedicalCertificateUseCase {

    constructor(
        private timeSheetRepository: ITimeSheetRepository,
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository,
        private dateUtils: IDateUtils
    ){}

    async execute(data: ISetMedicalCertificateDTO) {
        const admin = await this.userRepository.findById(data.adminId)
        if(!admin) throw new ApiError(401, 'Usuário não autorizado')

        const positionAdmin = await this.positionRepository.getById(admin.props.positionId)
        if(!positionAdmin) throw new ApiError(404, 'Cargo não encontrado')

        const user = await this.userRepository.findById(data.userId)
        if(!user) throw new ApiError(404, 'Usuário não encontrado')

        if(positionAdmin.props.privillegeLevel <= 2 && admin.props.stationId != user.props.stationId)
            throw new ApiError(401, 'Usuário não autorizado')

        const medicalCertificatedDates = this.dateUtils.getArrayDatesBetwen(data.startsAt, data.endsAt)

        const promises = medicalCertificatedDates.map(async date => {
            await this.timeSheetRepository.UpdateTimeSheetByUserId({
                registeredDay: date.getUTCDate(),
                registeredMonth: date.getUTCMonth(),
                registeredYear: date.getUTCFullYear(),
                userId: user.id,
                medicalCertificate: true,
                missed: false
            })
        })

        await Promise.all(promises)

        return medicalCertificatedDates
    }

}