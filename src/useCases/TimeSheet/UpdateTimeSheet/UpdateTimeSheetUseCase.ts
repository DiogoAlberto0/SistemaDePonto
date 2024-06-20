import { ApiError } from '../../../entities/Error';
import { IPositionRepository } from '../../../repositories/IPositionRepository';
import { ITimeSheetRepository } from '../../../repositories/ITimeSheetRepository'
import { IUserRepository } from '../../../repositories/IUserRepository';
import { UpdateTimeSheetDTO } from './UpdateTimeSheetDTO';


export class UpdateTimeSheetuseCase {

    constructor(
        private timeSheetRepository: ITimeSheetRepository,
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository
    ){}


    async execute(data: UpdateTimeSheetDTO) {

        const admin = await this.userRepository.findById(data.adminId)
        if(!admin) throw new ApiError(401, 'Usuário não autorizado')

        const positionAdmin = await this.positionRepository.getById(admin.props.positionId)
        if(!positionAdmin) throw new ApiError(404, 'Cargo não encontrado')

        const user = await this.userRepository.findById(data.userId)
        if(!user) throw new ApiError(404, 'Usuário não encontrado')

        if(positionAdmin.props.privillegeLevel <= 2 && admin.props.stationId != user.props.stationId)
            throw new ApiError(401, 'Usuário não autorizado')

        return await this.timeSheetRepository.UpdateTimeSheetByUserId({
            userId: user.id,
            date: data.date,
            first_entrance: data.first_entrance,
            second_entrance: data.second_entrance,
            first_exit: data.first_exit,
            second_exit: data.second_exit,
            missed: data.missed
        })
    }
}