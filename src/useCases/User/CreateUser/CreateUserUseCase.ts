import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IPasswordUtils } from "../../../utils/password/IPasswordUtils";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

import { IStationRepository } from "../../../repositories/IStationRepository";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { ApiError } from "../../../entities/Error";

export class CreateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private passwordUtils: IPasswordUtils,
        private stationRespository: IStationRepository,
        private positionRepository: IPositionRepository

    ) {

    }

    async execute(data: ICreateUserRequestDTO) {

        const userAlreadyExists = await this.userRepository.findByPhone(data.phone)
        if (userAlreadyExists) throw new ApiError(400, 'Usuário ja existe')

        const stationExists = await this.stationRespository.getById(data.stationId)
        if (!stationExists) throw new ApiError(400, 'Posto informado não existe')

        const positionExists = await this.positionRepository.getById(data.positionId)
        if (!positionExists) throw new ApiError(400, 'Cargo informado não existe')

        if (!this.passwordUtils.validatePassword(data.password)) throw new ApiError(400, 'A senha deve conter pelomenos 10 caracteres, 1 letra, 1 numero, e um especial')

        const hash = this.passwordUtils.hash(data.password)

        const user = new User({
            name: data.name,
            phone: data.phone,
            stationId: data.stationId,
            positionId: data.positionId,
            hash
        })

        await this.userRepository.save(user)

        return user
    }
}