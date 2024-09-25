import { ApiError } from "../../../entities/Error";
import { Station } from "../../../entities/Station";
import { IStationRepository } from "../../../repositories/IStationRepository";
import { ICnpjUtils } from "../../../utils/cnpj/ICnpjUtils";
import { ICreateStationDTO } from "./CreateStationDTO";



export class CreateStationUseCase {

    constructor(
        private stationRepository: IStationRepository,
        private cnpjUtils: ICnpjUtils
    ) {}

    async execute(data: ICreateStationDTO) {

        const isValidCNPJ = this.cnpjUtils.isValid(data.cnpj)
        if(!isValidCNPJ) throw new ApiError(400, 'CNPJ inválido')

        const alreadyExistStationName = await this.stationRepository.getByName(data.name)
        const alreadyExistStationCNPJ = await this.stationRepository.getByCNPJ(this.cnpjUtils.removePoints(data.cnpj))

        if(alreadyExistStationName || alreadyExistStationCNPJ) throw new Error('Posto ja existente')

        const station = new Station({
            name: data.name,
            cnpj: this.cnpjUtils.removePoints(data.cnpj),
            coord: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            }
        })

        await this.stationRepository.save(station)

        return station
    }
}