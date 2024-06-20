import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { ITimeSheetRepository } from "../../../repositories/ITimeSheetRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IGetTimeSheetDTO } from "./GetTimeSheetDTO";




export class GetTimeSheetUseCase {

    constructor(
        private timeSheetRepository: ITimeSheetRepository,
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository
    ) { }
    async execute(data: IGetTimeSheetDTO) {

        const admin = await this.userRepository.findById(data.adminId)
        if (!admin) throw new ApiError(401, 'Usuário não autorizado')

        const adminPosition = await this.positionRepository.getById(admin.props.positionId)
        if (!adminPosition) throw new ApiError(401, 'Usuário não autorizado')

        const user = await this.userRepository.findById(data.userId)
        if (!user) throw new ApiError(400, 'Usuário não encontrado')

        let timeSheet

        if (adminPosition.props.privillegeLevel == 1) {
            timeSheet = await this.timeSheetRepository.getByUserIdAndYearAndMonth(admin.id, data.year, data.month)
        } else if (adminPosition.props.privillegeLevel == 2) {

            if (user.props.stationId != admin.props.stationId) throw new ApiError(401, 'Usuário não autorizado')

            timeSheet = await this.timeSheetRepository.getByUserIdAndYearAndMonth(user.id, data.year, data.month)
        } else {
            timeSheet = await this.timeSheetRepository.getByUserIdAndYearAndMonth(user.id, data.year, data.month)
        }

        return timeSheet
    }
}