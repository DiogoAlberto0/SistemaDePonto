import { ApiError } from "../../../entities/Error";
import { TimeSheet } from "../../../entities/TimeSheet";
import { IStationRepository } from "../../../repositories/IStationRepository";
import { ITimeSheetRepository } from "../../../repositories/ITimeSheetRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICoordUtils } from "../../../utils/coord/ICoord";
import { ICreateTimeSheetDTO } from "./CreateTimeSheetDTO";



export class CreateTimeSheetUseCase {

    constructor(
        private timeSheetRepository: ITimeSheetRepository,
        private userRepository: IUserRepository,
        private stationRepository: IStationRepository,
        private coordUtils: ICoordUtils
    ) { }

    async execute(data: ICreateTimeSheetDTO) {

        const user = await this.userRepository.findById(data.userId)
        if(!user) throw new ApiError(400, 'Usuário não cadastrado')

        const station = await this.stationRepository.getById(user.props.stationId)
        if(!station) throw new ApiError(400, 'Posto não encontrado')

        const isInRadius = this.coordUtils.verifyIfCoordsInRadius(station.props.coord, { latitude: data.latitude, longitude: data.longitude}, 1)
        if(!isInRadius) throw new ApiError(400, 'Distância entre o posto e o funcionário muito alta')

        const existentTimeSheet = await this.timeSheetRepository.getByUserIdAndDate(data.userId, data.createdAt)

        if(!existentTimeSheet) {
            const timeSheet = new TimeSheet({
                userId: data.userId,
                registeredDay: data.createdAt.getUTCDate(),
                registeredMonth: data.createdAt.getUTCMonth(),
                registeredYear: data.createdAt.getUTCFullYear(),
                clockin: {
                    first_entrance: BigInt(data.createdAt.getTime()),
                    missed: false
                }
            })
            return await this.timeSheetRepository.save(timeSheet)
        } else {
            return await this.timeSheetRepository.setClockinById(existentTimeSheet.id, data.createdAt)
        }
        
    }
}
