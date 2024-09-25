import { Position } from "../../entities/Position";
import { Station } from "../../entities/Station";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";


export class InMemoryUserDatabase implements IUserRepository {

    private users:User[] = [];
    position: Position[] = []
    station: Station[] = []

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

    async updateById(user: User): Promise<User> {
        const userIndex = this.users.findIndex(({ id }) => user.id)

        if(userIndex < 0) throw new Error('Usuário nãoencontrado')

        this.users[userIndex] = user

        return user
    }

    async findByIdWithStation(userId: string): Promise<{ user: User; station: Station; position: Position; } | null> {
        const user = await this.findById(userId)

        if(!user) return null

        const position = this.position.find(position => position.id === user.props.positionId)
        const station = this.station.find(station => station.id === user.props.stationId)

        if(!position || !station) return null

        return ({
            user,
            station,
            position
        })
    }
}