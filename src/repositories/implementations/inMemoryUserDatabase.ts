import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";


export class InMemoryUserDatabase implements IUserRepository {

    private users:User[] = [];

    async save(user: User): Promise<void> {
        this.users.push(user)
    }
    async findByPhone(phone: string): Promise<User | null> {
        const user = this.users.find(user => user.props.phone === phone)
    
        return user || null
    }
    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id)

        return user || null
    }

    async getAll(): Promise<User[]> {
        return this.users
    }

    async getAllByStationId(stationId: string): Promise<User[]> {
        return this.users.filter(user => user.props.stationId === stationId)
    }
}