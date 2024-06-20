import { Position } from "../../entities/Position";
import { IPositionRepository } from "../IPositionRepository";


export class InMemoryPositionRepository implements IPositionRepository {
    
    private positions: Position[] = []
    
    async save(position: Position): Promise<Position> {
        this.positions.push(position)
        return position
    }
    async getByOffice(office: string): Promise<Position | null> {
        const position = this.positions.find(position => position.props.office === office)

        return position || null
    }
    
    async getById(id: string): Promise<Position | null> {
        const position = this.positions.find(position => position.id === id)

        return position || null
    }
    async update(id: string, privilegeLevel: number): Promise<Position | null> {
        const positionIndex = this.positions.findIndex(position => position.id === id)
        if(positionIndex < 0) throw Error('Cargo não encontrado')

        this.positions[positionIndex].props.privillegeLevel = privilegeLevel
        return this.positions[positionIndex]
    }

    async getAll(): Promise<Position[]> {
        return this.positions 
    }

}