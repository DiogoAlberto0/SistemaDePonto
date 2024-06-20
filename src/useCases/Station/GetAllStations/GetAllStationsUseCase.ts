import { IStationRepository } from "../../../repositories/IStationRepository";



export class GetAllStationsUseCase {

    constructor(
        private stationRepository: IStationRepository
    ) {}

    async execute() {

        const positions = await this.stationRepository.getAll()

        return positions
    }
}