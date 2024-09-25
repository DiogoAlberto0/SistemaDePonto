import { ApiError } from "../../../entities/Error";
import { Station } from "../../../entities/Station";
import { IStationRepository } from "../../../repositories/IStationRepository";
import { ICnpjUtils } from "../../../utils/cnpj/ICnpjUtils";
import { IUpdateStationDTO } from "./UpdateStationDTO";



export class UpdateStationUseCase {

    constructor(
        private stationRepository: IStationRepository,
        private cnpjUtils: ICnpjUtils
    ) { }

    async execute(data: IUpdateStationDTO) {

        const existentStation = await this.stationRepository.getById(data.id)
        if (!existentStation) throw new ApiError(400, "Posto não existe")

        const isValidCNPJ = this.cnpjUtils.isValid(data.cnpj)
        if (!isValidCNPJ) throw new ApiError(400, 'CNPJ inválido')

        const alreadyExistStationName = await this.stationRepository.getByName(data.name)
        const alreadyExistStationCNPJ = await this.stationRepository.getByCNPJ(this.cnpjUtils.removePoints(data.cnpj))

        if (alreadyExistStationName && alreadyExistStationName.id != existentStation.id) throw new ApiError(400, 'Nome ja cadastrado')
        if (alreadyExistStationCNPJ && alreadyExistStationCNPJ.id != existentStation.id) throw new ApiError(400, 'CNPJ ja cadastrado')

        if (isNaN(data.coord.latitude) || isNaN(data.coord.longitude)) throw new ApiError(400, 'Coordenadas inválidas')

        const station = new Station({
            name: data.name,
            cnpj: this.cnpjUtils.removePoints(data.cnpj),
            coord: {
                latitude: data.coord.latitude,
                longitude: data.coord.longitude
            }
        }, existentStation.id)

        await this.stationRepository.updateById(station)

        return station
    }
}