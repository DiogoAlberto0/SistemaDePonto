import { User } from "../entities/User";


export interface IUserRepository {
    save(user: User) : Promise<void>;
    findByPhone(phone: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    getAll(): Promise<User[]>
    getAllByStationId(stationId: string): Promise<User[]>
}