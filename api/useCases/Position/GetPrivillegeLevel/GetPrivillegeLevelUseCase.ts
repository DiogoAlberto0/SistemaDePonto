import { ApiError } from "../../../entities/Error";

import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { GetPrivillegeLevelDTO } from "./GetPrivillegeLevelDTO";



export class GetPrivillegeLevelUseCase {

    constructor(
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository,
    ) {}

    async execute(data: GetPrivillegeLevelDTO) {

        const user = await this.userRepository.findById(data.userId)
        if(!user) return {
            privillegeLevel: 0
        }

        const position = await this.positionRepository.getById(user.props.positionId)
        if(!position) return {
            privillegeLevel: 0
        }

        return {
            privillegeLevel: position.props.privillegeLevel
        }
    }
}

