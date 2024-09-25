import { ApiError } from "../../../entities/Error";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { IUpdatePositionDTO } from "./UpdatePositionDTO";



export class UpdatePositionUseCase {

    constructor(
        private positionRepository: IPositionRepository
    ){}

    async execute(data: IUpdatePositionDTO) {

        const existentPosition = await this.positionRepository.getById(data.id)
        if(!existentPosition) throw new ApiError(400, 'Cargo não cadastrado')

        return this.positionRepository.update(existentPosition.id, data.privillegeLevel)
    }   
}