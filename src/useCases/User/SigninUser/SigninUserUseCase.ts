import { ApiError } from "../../../entities/Error";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IHashPassword } from "../../../utils/hash/IHashPassword";
import { IToken } from "../../../utils/jwt/IToken";
import { cleanPhoneNumber } from "../../../validators/phone.clear";
import { ISigninUserRequestDTO } from "./SigninUserDTO";




export class SigninUserUseCase {

    constructor(
        private userRepository: IUserRepository,
        private hashPassword: IHashPassword,
        private tokenUtils: IToken,
    ) {}

    async execute(data: ISigninUserRequestDTO) {

        const { phone , password } = data
        const cleaneredPhone = cleanPhoneNumber(phone)

        const user = await this.userRepository.findByPhone(cleaneredPhone)

        if(!user) throw new ApiError(401, 'Usuário não existe')

        const isCorrectlyPassword = this.hashPassword.compareHash(password, user.props.hash)

        if(!isCorrectlyPassword) throw new ApiError(401, 'Senha incorreta')

        const token = this.tokenUtils.generateToken({ userId: user.id }, 24)

        return token
    }
}