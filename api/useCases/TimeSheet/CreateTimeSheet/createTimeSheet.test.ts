import { describe, it, expect } from 'vitest'
import { CoordUtils } from '../../../utils/coord/implementation/coordUtils'
import { PasswordUtils } from '../../../utils/password/implementation/password.utils'

//STATION
import { CnpjUtils } from '../../../utils/cnpj/implementation/CnpjUtils'
import { InMemoryStationDatabase } from '../../../repositories/implementations/inMemoryStationDatabase'
import { CreateStationUseCase } from '../../Station/CreateStation/CreateStationUseCase'
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils)

//POSITION
import { InMemoryPositionRepository } from '../../../repositories/implementations/inMemoryPositionRepository'
import { CreatePositionUseCase } from '../../Position/CreatePosition/CreatePositionUseCase'
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

//USER
import { InMemoryUserDatabase } from '../../../repositories/implementations/inMemoryUserDatabase'
import { CreateUserUseCase } from '../../User/CreateUser/CreateUserUseCase'
const userRepository = new InMemoryUserDatabase()
const createUserUseCase = new CreateUserUseCase(userRepository, new PasswordUtils(), stationRepository, positionRepository)

//TIMESHEET
import { TimeSheet } from '../../../entities/TimeSheet'
import { CreateTimeSheetUseCase } from './CreateTimeSheetUseCase'
import { InMemoryTimeSheetRepository } from '../../../repositories/implementations/inMemoryTimeSheetRepository'

const timeSheetRepository = new InMemoryTimeSheetRepository()
const createTimeSheetUseCase = new CreateTimeSheetUseCase(timeSheetRepository, userRepository, stationRepository, new CoordUtils())
describe('create time sheet tests', async () => {

    const position = await createPositionUseCase.execute({
        office: 'funcionário',
        privillegeLevel: 1
    })
    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.012,
            longitude: -15.032
        }
    })
    const user = await createUserUseCase.execute({
        name: 'Diogo',
        password: '1234567Abc.',
        phone: '61986548270',
        stationId: station.id,
        positionId: position.id
    })

    it('should be not able to create a new time sheet if not registered user', () => {

        expect(
            createTimeSheetUseCase.execute({
                userId: 'asdasd',
                createdAt: new Date(),
                latitude: -15.032,
                longitude: -15.512
            })
        ).rejects.toThrow('Usuário não cadastrado')

    })

    it('should not be able to create a new time sheet if not locale in station radius', () => {

        expect(
            createTimeSheetUseCase.execute({
                userId: user.id,
                createdAt: new Date(),
                latitude: -15.032,
                longitude: -15.512
            })
        ).rejects.toThrow('Distância entre o posto e o funcionário muito alta')

    })


    it('it should be possible to create a new timesheet', () => {

        expect(
            createTimeSheetUseCase.execute({
                userId: user.id,
                createdAt: new Date(new Date().getTime() + 5000),
                latitude: -15.012,
                longitude: -15.032
            })
        ).resolves.toBeInstanceOf(TimeSheet)

    })

    it('it should be possible to alter an existent time sheet', async () => {

        await createTimeSheetUseCase.execute({
            userId: user.id,
            createdAt: new Date(new Date().getTime() + 5000),
            latitude: -15.012,
            longitude: -15.032
        })

        expect(createTimeSheetUseCase.execute({
            userId: user.id,
            createdAt: new Date(new Date().getTime() + 5000),
            latitude: -15.012,
            longitude: -15.032
        })
        ).resolves.toBeInstanceOf(TimeSheet)

    })

})