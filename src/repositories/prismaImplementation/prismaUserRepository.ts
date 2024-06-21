import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { prisma } from "./prismaConnection";



export class PrismaUserRepository implements IUserRepository {

    async save({ props: {name, phone, hash, positionId, stationId }, id}: User): Promise<void> {
        try {
            await prisma.user.create({
                data: {
                    id,
                    name,
                    phone,
                    hash,
                    positionId,
                    stationId
                }
            })
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const users = await prisma.user.findMany()

            return users.map(({ id, name, phone, positionId, stationId }) => (
                new User({
                    name,
                    phone,
                    hash: '',
                    positionId,
                    stationId
                }, id)
            ))
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }

    async getAllByStationId(stationId: string): Promise<User[]> {
        try {
            const users = await prisma.user.findMany({
                where: {
                    stationId
                }
            })

            return users.map(({ id, name, phone, positionId, stationId }) => (
                new User({
                    name,
                    phone,
                    hash: '',
                    positionId,
                    stationId
                }, id)
            ))
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        } 
    }

    async findByPhone(phone: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    phone
                }
            })

            if(!user) return null

            return new User({
                name: user.name,
                phone: user. phone,
                hash: user.hash,
                positionId: user.positionId,
                stationId: user.stationId
            }, user.id)

        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })
    
                if(!user) return null
    
                return new User({
                    name: user.name,
                    phone: user. phone,
                    hash: user.hash,
                    positionId: user.positionId,
                    stationId: user.stationId
                }, user.id)
    
            } catch (error) {
                throw new Error('Internal server error')
            }
        } catch (error: any) {
            throw new Error(error.messgae || 'Internal server error')
        } 
    }
}