import { Position } from "../../entities/Position";
import { Station } from "../../entities/Station";
import { User } from "../../entities/User";
import { cleanPhoneNumber } from "../../validators/phone.clear";
import { IUserRepository } from "../IUserRepository";
import { prisma } from "./prismaConnection";



export class PrismaUserRepository implements IUserRepository {

    async save({ props: { name, phone, hash, positionId, stationId }, id }: User): Promise<void> {
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
            throw new Error(error.message || 'Internal server error')
        }
    }

    async updateById(user: User): Promise<User> {
        try {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: user.props.name,
                    phone: user.props.phone,
                    hash: user.props.hash,
                    positionId: user.props.positionId,
                    stationId: user.props.stationId
                }
            })

            return user
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error')
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
            throw new Error(error.message || 'Internal server error')
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
            throw new Error(error.message || 'Internal server error')
        }
    }

    async findByPhone(phone: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    phone: cleanPhoneNumber(phone)
                }
            })

            if (!user) return null

            return new User({
                name: user.name,
                phone: user.phone,
                hash: user.hash,
                positionId: user.positionId,
                stationId: user.stationId
            }, user.id)

        } catch (error: any) {
            throw new Error(error.message || 'Internal server error')
        }
    }

    async findById(id: string): Promise<User | null> {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if (!user) return null

            return new User({
                name: user.name,
                phone: user.phone,
                hash: user.hash,
                positionId: user.positionId,
                stationId: user.stationId
            }, user.id)

        } catch (error) {
            throw new Error('Internal server error')
        }

    }

    async findByIdWithStation(userId: string): Promise<{ user: User; station: Station; position: Position} | null> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    station: true,
                    position: true
                }
            })

            if (!user) return null

            return ({
                user: new User({
                    name: user.name,
                    phone: user.phone,
                    hash: user.hash,
                    positionId: user.positionId,
                    stationId: user.stationId
                }, user.id)
                ,
                station: new Station({
                    name: user.station.name,
                    cnpj: user.station.cnpj,
                    coord: {
                        latitude: user.station.latitude,
                        longitude: user.station.longitude,
                    },
                }, user.station.id),
                position: new Position({
                    office: user.position.office,
                    privillegeLevel: user.position.privillegeLevel,
                }, user.position.id)
            })



        } catch (error) {
            throw new Error('Internal server error')
        }
    }
}