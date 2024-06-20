import { describe, it, expect } from 'vitest'


import { Station } from '../../../entities/Station'
import { CnpjUtils } from '../../../utils/cnpj/implementation/CnpjUtils'
import { CreateStationUseCase } from './CreateStationUseCase'
import { InMemoryStationDatabase } from '../../../repositories/implementations/inMemoryStationDatabase'

const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

describe('create station tests', () => {

    it('should be able to create a new station', () => {
        expect(
            createStationUseCase.execute({
                name: 'Me põe na história',
                cnpj: '19.957.082/0001-95',
                coords: {
                    latitude: -15.000,
                    longitude: -15.000
                }
            })
        ).resolves.toBeInstanceOf(Station)
    })

    it('should not be able to create a new station with a same name', () => {
        expect(
            createStationUseCase.execute({
                name: 'Me põe na história',
                cnpj: '19.957.082/0001-95',
                coords: {
                    latitude: -15.000,
                    longitude: -15.000
                }
            })
        ).rejects.toThrow('Posto ja existente')
    })

    it('should not be able to create a new station with a same cnpj', () => {
        expect(
            createStationUseCase.execute({
                name: 'Me põe na história',
                cnpj: '19.957.082/0001-95',
                coords: {
                    latitude: -15.000,
                    longitude: -15.000
                }
            })
        ).rejects.toThrow('Posto ja existente')
    })

    it('should not be able to create a new station with a invalid cnpj', () => {
        expect(
            createStationUseCase.execute({
                name: 'Me põe na história',
                cnpj: '11.111.111/1111-11',
                coords: {
                    latitude: -15.000,
                    longitude: -15.000
                }
            })
        ).rejects.toThrow('CNPJ inválido')
    })
})