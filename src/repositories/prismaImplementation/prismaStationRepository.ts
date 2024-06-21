import { Station } from "../../entities/Station";
import { IStationRepository } from "../IStationRepository";
import { prisma } from "./prismaConnection";



export class PrismaStationRepository implements IStationRepository {


    async getAll(): Promise<Station[]> {
        try {
            const stations = await prisma.station.findMany()

            return stations.map(station => (
                new Station({
                    name: station.name,
                    cnpj: station.cnpj,
                    coord: {
                        latitude: station.latitude,
                        longitude: station.longitude
                    }
                })
            ))
        } catch (error: any) {
            throw new Error('Internal server error');

        }
    }
    async getByCNPJ(cnpj: string): Promise<Station | null> {
        try {
            const station = await prisma.station.findUnique({
                where: {
                    cnpj
                }
            })
            if (!station) return null

            return new Station({
                name: station.name,
                cnpj: station.cnpj,
                coord: {
                    latitude: station.latitude,
                    longitude: station.longitude
                }
            })
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error');

        }
    }
    async getById(id: string): Promise<Station | null> {
        try {
            const station = await prisma.station.findUnique({
                where: {
                    id
                }
            })
            if (!station) return null

            return new Station({
                name: station.name,
                cnpj: station.cnpj,
                coord: {
                    latitude: station.latitude,
                    longitude: station.longitude
                }
            })
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error');

        }
    }
    async getByName(name: string): Promise<Station | null> {
        try {
            const position = await prisma.station.findUnique({
                where: {
                    name
                }
            })

            if (!position) return null

            return new Station({
                name: position.name,
                cnpj: position.cnpj,
                coord: {
                    latitude: position.latitude,
                    longitude: position.longitude
                }

            })
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error');

        }
    }
    async save({ props: { name, coord, cnpj }, id }: Station): Promise<void> {
        try {
            await prisma.station.create({
                data: {
                    id,
                    name,
                    cnpj,
                    latitude: coord.latitude,
                    longitude: coord.longitude
                }
            })
        } catch (error: any) {
            throw new Error(error.message || 'Internal server error');

        }
    }
}