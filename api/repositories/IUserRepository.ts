import { Position } from "../entities/Position";
import { Station } from "../entities/Station";
import { User } from "../entities/User";


export interface IUserRepository {
    save(user: User) : Promise<void>;
    findByPhone(phone: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByIdWithStation(userId:string): Promise<{ user: User , station: Station, position: Position } | null>
    getAll(): Promise<User[]>
    getAllByStationId(stationId: string): Promise<User[]>
    updateById(user: User): Promise<User>
}