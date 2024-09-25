import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";



export class GetAllUsersUseCase {

    constructor(
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository
    ) {}

    async execute({ userId }: { userId: string }) {

        const user = await this.userRepository.findById(userId)
        if(!user) throw new ApiError(401, 'Usuário não autorizado')

        const position = await this.positionRepository.getById(user.props.positionId)
        if(!position || position.props.privillegeLevel < 2) throw new ApiError(401, 'Usuário não autorizado')

        let users
        if(position.props.privillegeLevel > 2) {
            users = await this.userRepository.getAll()
        } else {
            users = await this.userRepository.getAllByStationId(user.props.stationId)
        }


        return users
    }
}