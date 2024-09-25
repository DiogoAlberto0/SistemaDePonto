import { ApiError } from "../../../entities/Error";
import { User } from "../../../entities/User";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IPasswordUtils } from "../../../utils/password/IPasswordUtils";
import { IUpdatePhoneAndPassUseCaseDTO } from "./IUpdatePhoneAndPassDTO";




export class UpdatePhoneAndPassUseCase {

    constructor(
        private userRepository: IUserRepository,
        private positionRepository: IPositionRepository,
        private passwordUtils: IPasswordUtils
    ) { }

    async execute(data: IUpdatePhoneAndPassUseCaseDTO) {

        const {
            adminId,
            phone,
            password
        } = data

        const admin = await this.userRepository.findById(adminId)
        if (!admin) throw new ApiError(401, 'Usuário não autorizado')
        const adminPosition = await this.positionRepository.getById(admin.props.positionId)
        if (!adminPosition) throw new ApiError(401, 'Usuário não autorizado')

        if (!this.passwordUtils.validatePassword(password)) throw new ApiError(400, 'A senha deve conter pelomenos 10 caracteres, 1 letra, 1 numero, e um especial')
        
        const userPhoneAlredyExists = await this.userRepository.findByPhone(phone)
        if (userPhoneAlredyExists && admin.id != userPhoneAlredyExists.id) throw new ApiError(400, 'Telefone ja cadastrado')

        return await this.userRepository.updateById(new User({
            name: admin.props.name,
            phone: phone,
            hash: this.passwordUtils.hash(password),
            positionId: admin.props.positionId,
            stationId: admin.props.stationId
        }, admin.id))

    }
}