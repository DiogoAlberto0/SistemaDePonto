import { IPositionRepository } from "../../../repositories/IPositionRepository";



export class GetAllPositionsUseCase {

    constructor(
        private positionRepository: IPositionRepository
    ) {}

    async execute() {

        const positions = this.positionRepository.getAll()

        return positions
    }
}