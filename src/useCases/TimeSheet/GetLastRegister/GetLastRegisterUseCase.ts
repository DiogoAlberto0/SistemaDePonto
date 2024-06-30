import { ApiError } from "../../../entities/Error";
import { ITimeSheetRepository } from "../../../repositories/ITimeSheetRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IGetLastRegisterDTO } from "./GetLastRegisterDTO";




export class GetLastRegisterUseCase {

    constructor(
        private timeSheetRepository: ITimeSheetRepository,
        private userRepository: IUserRepository,
    ) { }
    async execute(data: IGetLastRegisterDTO) {

        const user = await this.userRepository.findById(data.userId)
        if (!user) throw new ApiError(400, 'Usuário não encontrado')

        const date = new Date()

        const lastTimeSheet = await this.timeSheetRepository.getLastRegisterByDate({
            userId: data.userId,
            day: date.getUTCDate(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear()
        })

        return lastTimeSheet
    }
}