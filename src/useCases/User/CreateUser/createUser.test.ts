import { expect, describe, it } from 'vitest'

import { User } from '../../../entities/User'

//create a station for test
import { CnpjUtils } from '../../../utils/cnpj/implementation/CnpjUtils'
import { InMemoryStationDatabase } from '../../../repositories/implementations/inMemoryStationDatabase'
import { CreateStationUseCase } from '../../Station/CreateStation/CreateStationUseCase'
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

//create a position for test
import { InMemoryPositionRepository } from '../../../repositories/implementations/inMemoryPositionRepository'
import { CreatePositionUseCase } from '../../Position/CreatePosition/CreatePositionUseCase'
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)


import { InMemoryUserDatabase } from '../../../repositories/implementations/inMemoryUserDatabase'
import { CreateUserUseCase } from './CreateUserUseCase'
import { HashPassword } from '../../../utils/hash/implementation/hashPassword.utils'
const userRepository = new InMemoryUserDatabase()
const hashUtils = new HashPassword()
const createUserUseCase = new CreateUserUseCase(userRepository, hashUtils, stationRepository, positionRepository)


describe('Create user tests', async () => {

    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.000,
            longitude: -15.000
        }
    })

    const position = await createPositionUseCase.execute({
        office: 'encarregado',
        privillegeLevel: 1    
    })

    it('should be not possible to create a new user with a invalid password', () => {
        expect(createUserUseCase.execute({
            name: 'Diogo',
            phone: '61986548270',
            password: '12345',
            stationId: station.id,
            positionId: position.id
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be possible to create user with a same phone number', async () => {
        await createUserUseCase.execute({
            name: 'Diogo',
            phone: '61986548271',
            password: '135792468Diogo;',
            stationId: station.id,
            positionId: position.id
        })

        expect(createUserUseCase.execute({
            name: 'Fulano',
            phone: '61986548271',
            password: '135792468Diogo;',
            stationId: station.id,
            positionId: position.id
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be possible to create user with a invalid station id', () => {
        expect(createUserUseCase.execute({
            name: 'Diogo',
            phone: '61986548270',
            password: '123456Diogo.',
            stationId: '123',
            positionId: position.id
        })).rejects.toBeInstanceOf(Error)
    })



    it('should be create user', () => {
        expect(createUserUseCase.execute({
            name: 'Diogo teste',
            phone: '61986548270',
            password: '135792468Diogo;',
            stationId: station.id,
            positionId: position.id
        })).resolves.toBeInstanceOf(User)
    })

})

