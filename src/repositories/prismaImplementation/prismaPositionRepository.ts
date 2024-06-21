import { Position } from "../../entities/Position";
import { IPositionRepository } from "../IPositionRepository";
import { prisma } from "./prismaConnection";



export class PrismaPositionRepository implements IPositionRepository {
    async getAll(): Promise<Position[]> {
        try {
            const response = await prisma.position.findMany()
    
            const positions = response.map(position => new Position({ office: position.office, privillegeLevel: position.privillegeLevel}, position.id))
    
            return positions
            
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async getById(id: string): Promise<Position | null> {
        try {
            const position = await prisma.position.findUnique({
                where: {
                    id
                }
            })
    
            if(!position) {
                return null
            }
            
            return new Position({ office: position.office, privillegeLevel: position.privillegeLevel}, position.id)
            
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async getByOffice(office: string): Promise<Position | null> {
        try {
            const position = await prisma.position.findUnique({
                where: {
                    office
                }
            })
    
            if(!position) {
                return null
            }
            
            return new Position({ office: position.office, privillegeLevel: position.privillegeLevel}, position.id)
            
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    
    }
    async save(position: Position): Promise<Position> {
        try {
            await prisma.position.create({
                data: {
                    id: position.id,
                    office: position.props.office,
                    privillegeLevel: position.props.privillegeLevel
                }
            })
            return position
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
    async update(id: string, privillegeLevel: number): Promise<Position | null> {
        try {
            const position = await prisma.position.update({
                where: {
                    id
                },
                data: {
                    privillegeLevel
                }
            })

            return new Position({ office: position.office, privillegeLevel: position.privillegeLevel}, position.id)
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }
}