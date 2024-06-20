import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IHashPassword } from "../../../utils/hash/IHashPassword";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

import { validatePassword } from '../../../validators/password.validator'
import { IStationRepository } from "../../../repositories/IStationRepository";
import { IPositionRepository } from "../../../repositories/IPositionRepository";

export class CreateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private hashPassword: IHashPassword,
        private stationRespository: IStationRepository,
        private positionRepository: IPositionRepository

    ) {

    }

    async execute(data: ICreateUserRequestDTO) {

        const userAlreadyExists = await this.userRepository.findByPhone(data.phone)
        if (userAlreadyExists) throw new Error('Usuário ja existe')

        const stationExists = await this.stationRespository.getById(data.stationId)
        if (!stationExists) throw new Error('Posto informado não existe')

        const positionExists = await this.positionRepository.getById(data.positionId)
        if (!positionExists) throw new Error('Cargo informado não existe')

        if (!validatePassword(data.password)) throw new Error('A senha deve conter pelomenos 10 caracteres, 1 letra, 1 numero, e um especial')

        const hash = this.hashPassword.hash(data.password)

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