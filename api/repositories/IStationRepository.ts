import { Station } from "../entities/Station";



export interface IStationRepository {
    save(station: Station): Promise<void>
    getByName(name: string): Promise<Station | null>
    getById(id: string): Promise<Station | null>
    getByCNPJ(cnpj: string): Promise<Station | null>
    getAll(): Promise<Station[]>
    updateById(station: Station): Promise<Station>
}