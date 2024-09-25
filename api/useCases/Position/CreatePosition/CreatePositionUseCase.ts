import { ApiError } from "../../../entities/Error";
import { Position } from "../../../entities/Position";
import { IPositionRepository } from "../../../repositories/IPositionRepository";
import { ICreatePositionDTO } from "./CreatePositionDTO";




export class CreatePositionUseCase {


    constructor(
        private positionRepository: IPositionRepository
    ) {}

    async execute(data: ICreatePositionDTO) {

        const existsPosition = await this.positionRepository.getByOffice(data.office.toUpperCase())
        if(existsPosition) throw new ApiError(400, 'Cargo ja existente')

        const position = new Position({
            office: data.office,
            privillegeLevel: data.privillegeLevel
        })

        return await this.positionRepository.save(position)
    }
}