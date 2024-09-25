import { expect, describe, it } from 'vitest'

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

//creat users
import { InMemoryUserDatabase } from '../../../repositories/implementations/inMemoryUserDatabase'
import { CreateUserUseCase } from '../../User/CreateUser/CreateUserUseCase'
import { PasswordUtils } from '../../../utils/password/implementation/password.utils'

const userRepository = new InMemoryUserDatabase()
const hashUtils = new PasswordUtils()
const createUserUseCase = new CreateUserUseCase(userRepository, hashUtils, stationRepository, positionRepository)

//get privillege
import { GetPrivillegeLevelUseCase } from './GetPrivillegeLevelUseCase'
const getPrivillegeLevelUseCase = new GetPrivillegeLevelUseCase(userRepository, positionRepository)

describe('get privillege levell tests', async () => {

    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.000,
            longitude: -15.000
        }
    })

    const funcionario = await createPositionUseCase.execute({
        office: 'funcionario',
        privillegeLevel: 1    
    })

    const encarregado = await createPositionUseCase.execute({
        office: 'encarregado',
        privillegeLevel: 2   
    })

    const user = await createUserUseCase.execute({
        name: 'Diogo',
        phone: '61986548270',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: funcionario.id
    })

    const user2 = await createUserUseCase.execute({
        name: 'Diogo',
        phone: '61986548271',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: encarregado.id
    })

    it('should be privilege level from not authenticated user too be 0', () => {
        expect(
            getPrivillegeLevelUseCase.execute({ userId: 'invalid user id' })
        ).resolves.toStrictEqual({ privillegeLevel: 0 })
    })

    it('should be privilegge level from funcionario user to be 1', () => {
        expect(
            getPrivillegeLevelUseCase.execute({ userId: user.id })
        ).resolves.toStrictEqual({ privillegeLevel: 1 })
    })

    it('should be privilegge level from funcionario user to be 2', () => {
        expect(
            getPrivillegeLevelUseCase.execute({ userId: user2.id })
        ).resolves.toStrictEqual({ privillegeLevel: 2 })
    })

})

