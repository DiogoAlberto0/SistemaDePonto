import { Position } from "../entities/Position";

export interface IPositionRepository {
    save(position: Position): Promise<Position>;
    getByOffice(office: string): Promise<Position | null>;
    getById(id:string): Promise<Position | null>;
    getAll(): Promise<Position[]>
    update(id: string, privilegeLevel: number): Promise<Position | null>;
}