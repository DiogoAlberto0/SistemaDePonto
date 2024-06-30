import { Station } from "../../entities/Station";
import { IStationRepository } from "../IStationRepository";



export class InMemoryStationDatabase implements IStationRepository {

    stations: Station[] = []

    async getByName(name: string): Promise<Station | null> {
        const station = this.stations.find(station => station.props.name === name)
        
        return station || null
    }

    async save (station: Station): Promise<void> {
        this.stations.push(station)
    }

    async getById(id: string): Promise<Station | null> {
        return this.stations.find(station => station.id === id) || null
    }

    async getByCNPJ(cnpj: string): Promise<Station | null> {
        return this.stations.find(station => station.props.cnpj === cnpj) || null
    }

    async getAll(): Promise<Station[]> {
        return this.stations
    }

    async updateById(stationToUpdate: Station): Promise<Station> {
        const stationIndex = this.stations.findIndex(station => station.id === stationToUpdate.id)

        if(stationIndex < 0) throw new Error('Posto não encontrado')

        this.stations[stationIndex] = stationToUpdate

        return stationToUpdate
    }
}