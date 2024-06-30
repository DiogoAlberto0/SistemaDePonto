import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";



export class GetUserByIdUseCase {

    constructor(
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository
    ) {}

    async execute({ adminId, userId }: { adminId: string, userId?: string }) {

        const user = await this.userRepository.findByIdWithStation(adminId)
        if(!user) throw new ApiError(401, 'Usuário não autorizado')

        if(user.position.props.privillegeLevel < 2 || !userId) return user

        const userFromDb = await this.userRepository.findByIdWithStation(userId)


        if(user.position.props.privillegeLevel < 3 && userFromDb?.user.props.stationId != user.user.props.stationId) {
            return user
        } 
        return userFromDb
    }
}