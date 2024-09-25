import { describe, it, expect } from 'vitest'


import { Station } from '../../../entities/Station'
import { CnpjUtils } from '../../../utils/cnpj/implementation/CnpjUtils'
import { UpdateStationUseCase } from './UpdateStationUseCase'
import { InMemoryStationDatabase } from '../../../repositories/implementations/inMemoryStationDatabase'
import { ApiError } from '../../../entities/Error'

const stationRepository = new InMemoryStationDatabase()
const updateStationUseCase = new UpdateStationUseCase(stationRepository, new CnpjUtils())



describe('create station tests', () => {

    const station1 = new Station({
        name: 'Me põe na história',
        cnpj: '00253226000102',
        coord: {
            latitude: -15.032,
            longitude: -15.032
        }
    })

    const station2 = new Station({
        name: 'teste',
        cnpj: '56932755000189',
        coord: {
            latitude: -30.032,
            longitude: -30.032
        }
    })
    stationRepository.stations.push(station1, station2)

    it('should not be possible to update an inexistent station', async () => {
        const response = updateStationUseCase.execute({
            id: 'asdasdasd',
            name: 'teste',
            cnpj: '00.253.226/0001-02',
            coord: {
                latitude: -10.032,
                longitude: -10.032
            }
        })

        await expect(response).rejects.toBeInstanceOf(ApiError)
    })

    it('should not be possible to update station with invalid cnpj', async () => {
        const response = updateStationUseCase.execute({
            id: station2.id,
            name: 'teste',
            cnpj: '1234',
            coord: {
                latitude: -10.032,
                longitude: -10.032
            }
        })

        await expect(response).rejects.toBeInstanceOf(ApiError)
    })

    it('should not be possible to update station with invalid coord', async () => {
        const response = updateStationUseCase.execute({
            id: station2.id,
            name: 'teste',
            cnpj: '56.932.755/0001-89',
            coord: {
                latitude: Number('abc'),
                longitude: Number('abc')
            }
        })

        await expect(response).rejects.toBeInstanceOf(ApiError)
    })

    it('should not be possible to update station with the same name of another station', async () => {
        const response = updateStationUseCase.execute({
            id: station1.id,
            name: 'teste',
            cnpj: '00.253.226/0001-02',
            coord: {
                latitude: -10.032,
                longitude: -10.032
            }
        })

        await expect(response).rejects.toBeInstanceOf(ApiError)
    })

    it('should not be possible to update station with the same CNPJ of another station', async () => {
        const response = updateStationUseCase.execute({
            id: station2.id,
            name: 'teste',
            cnpj: '00.253.226/0001-02',
            coord: {
                latitude: -10.032,
                longitude: -10.032
            }
        })

        await expect(response).rejects.toBeInstanceOf(ApiError)
    })

    it('should be possible to update only cnpj', async () => {
        const response = await updateStationUseCase.execute({
            id: station2.id,
            name: station2.props.name,
            cnpj: '95.258.552/0001-00',
            coord: {
                latitude: station2.props.coord.latitude,
                longitude: station2.props.coord.longitude
            }
        })

        expect(response).toStrictEqual(new Station({
                name: station2.props.name,
                cnpj: '95258552000100',
                coord: {
                    latitude: station2.props.coord.latitude,
                    longitude: station2.props.coord.longitude
                }
            }, station2.id)
        )
    })

    it('should be possible to update only name', async () => {
        const response = await updateStationUseCase.execute({
            id: station2.id,
            name: 'qualquer',
            cnpj: station2.props.cnpj,
            coord: {
                latitude: station2.props.coord.latitude,
                longitude: station2.props.coord.longitude
            }
        })

        expect(response).toStrictEqual(new Station({
                name: 'qualquer',
                cnpj: station2.props.cnpj,
                coord: {
                    latitude: station2.props.coord.latitude,
                    longitude: station2.props.coord.longitude
                }
            }, station2.id)
        )
    })

    it('should be possible to update only coords', async () => {
        const response = await updateStationUseCase.execute({
            id: station2.id,
            name: station2.props.name,
            cnpj: station2.props.cnpj,
            coord: {
                latitude: -45.013,
                longitude: -40.013
            }
        })

        expect(response).toStrictEqual(new Station({
                name: station2.props.name,
                cnpj: station2.props.cnpj,
                coord: {
                    latitude: -45.013,
                    longitude: -40.013
                }
            }, station2.id)
        )
    })

    it('should be possible to update only coords', async () => {
        const response = await updateStationUseCase.execute({
            id: station2.id,
            name: 'testando',
            cnpj: '63.289.880/0001-88',
            coord: {
                latitude: -45.090,
                longitude: -40.025
            }
        })

        expect(response).toStrictEqual(new Station({
                name: 'testando',
                cnpj: '63289880000188',
                coord: {
                    latitude: -45.090,
                    longitude: -40.025
                }
            }, station2.id)
        )
    })

})