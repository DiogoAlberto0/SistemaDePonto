import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IToken } from "../../../utils/jwt/IToken";
import { ValidateUserDTO } from "./ValidateUserDTO";




export class ValidateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository,
        private tokenUtils: IToken
    ) { }


    async execute(data: ValidateUserDTO) {

        const { userId } = this.tokenUtils.validateToken(data.token)
        if (!userId) throw new ApiError(401, 'Usuário não autenticado')

        const user = await this.userRepository.findById(userId)
        if (!user) throw new ApiError(401, 'Usuário não autenticado')

        const position = await this.positionRepository.getById(user.props.positionId)
        if(!position || position.props.privillegeLevel < data.privillegeLevel) throw new ApiError(401, 'Usuário não autorizado')
            
        return { userId }

    }
}