import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { ITimeSheetRepository } from "../../../repositories/ITimeSheetRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IGetMonthsAndYearsDTO } from "./GetMonthsAndYearsDTO";

export class GetMonthsAndYearsUseCase {

    constructor(
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository,
        private timeSheetRepository: ITimeSheetRepository
    ) { }


    async execute(data: IGetMonthsAndYearsDTO) {

        const adminUser = await this.userRepository.findById(data.adminId)
        if (!adminUser) throw new ApiError(401, 'Usuário não autenticado')

        const adminPosition = await this.positionRepository.getById(adminUser.props.positionId)
        if (!adminPosition) throw new ApiError(401, 'Usuário não autorizado')

        const user = await this.userRepository.findById(data.userId)
        if (!user) throw new ApiError(401, 'Usuário inválido')

        let yearsAndMonths

        if (adminPosition.props.privillegeLevel == 1) {
            yearsAndMonths = await this.timeSheetRepository.getMonthsAndYearByUserId(adminUser.id)
        } else if (adminPosition.props.privillegeLevel == 2) {

            if (user.props.stationId != adminUser.props.stationId) throw new ApiError(401, 'Usuário não autorizado')

            yearsAndMonths = await this.timeSheetRepository.getMonthsAndYearByUserId(user.id)
        } else {
            yearsAndMonths = await this.timeSheetRepository.getMonthsAndYearByUserId(user.id)
        }


        return yearsAndMonths
    }
}