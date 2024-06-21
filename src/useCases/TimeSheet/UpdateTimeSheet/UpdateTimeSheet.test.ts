import { describe, it, expect } from "vitest";
import { ApiError } from "../../../entities/Error";
import { PasswordUtils } from "../../../utils/password/implementation/password.utils";

//POSITION
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase";
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

//STATION
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase";
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

//USER
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { CreateUserUseCase } from "../../User/CreateUser/CreateUserUseCase";
const userRepository = new InMemoryUserDatabase()
const createUserUseCase = new CreateUserUseCase(userRepository,new PasswordUtils(),stationRepository, positionRepository)

//TIMESHEET
import { TimeSheet } from "../../../entities/TimeSheet";
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { UpdateTimeSheetuseCase } from "./UpdateTimeSheetUseCase";
const timeSheetRepository = new InMemoryTimeSheetRepository()
const updateTimeSheetUseCase = new UpdateTimeSheetuseCase(timeSheetRepository,userRepository, positionRepository)

describe('set misset to timesheet tests', async () => {

    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.032,
            longitude: -15.015
        }
    })
    const station2 = await createStationUseCase.execute({
        name: 'Orca',
        cnpj: '23.257.309/0001-67',
        coords: {
            latitude: -10.032,
            longitude: -10.015
        }
    })

    const funcionarioPosition = await createPositionUseCase.execute({
        office: 'funcionario',
        privillegeLevel: 1
    })
    const encarregadoPosition = await createPositionUseCase.execute({
        office: 'encarregado',
        privillegeLevel: 2
    })
    const gerentePosition = await createPositionUseCase.execute({
        office: 'gerente',
        privillegeLevel: 3
    })

    const funcionarioUser = await createUserUseCase.execute({
        name: 'Vitor Hugo',
        phone: '61981111111',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: funcionarioPosition.id
    })
    const funcionarioUserFromAnotherStation = await createUserUseCase.execute({
        name: 'Fulano',
        phone: '61982222222',
        password: '123456789Abc.',
        stationId: station2.id,
        positionId: funcionarioPosition.id
    })
    const encarregadoUser = await createUserUseCase.execute({
        name: 'Diogo',
        phone: '61986548270',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: encarregadoPosition.id
    })
    const gerenteUser = await createUserUseCase.execute({
        name: 'Vitor noimann',
        phone: '61984272645',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: gerentePosition.id
    })

    it('should not be able an funcionario set missed to any another funcionario', () => {
        expect(updateTimeSheetUseCase.execute({
            adminId: funcionarioUser.id,
            date: new Date(),
            userId: funcionarioUserFromAnotherStation.id
        })).rejects.toThrow(ApiError)
    })

    it('should not be able an encarregado set missed to funcionario from another station', () => {
        expect(updateTimeSheetUseCase.execute({
            adminId: encarregadoUser.id,
            date: new Date(),    
            userId: funcionarioUserFromAnotherStation.id
        })).rejects.toThrow(ApiError)
    })

    it('should be able an encarregado set missed to funcionario from the same station', () => {
        expect(updateTimeSheetUseCase.execute({
            adminId: encarregadoUser.id,
            date: new Date(),
            userId: funcionarioUser.id,
            missed: true
        })).resolves.toBeInstanceOf(TimeSheet)
    })

    it('should be able an encarregado alter funcionario time sheet from the same station', () => {
        expect(updateTimeSheetUseCase.execute({
            adminId: encarregadoUser.id,
            date: new Date(),
            userId: funcionarioUser.id,
            missed: false,
            first_entrance: new Date().getTime() - 50000,
            first_exit: new Date().getTime() - 40000,
            second_entrance: new Date().getTime() - 30000,
            second_exit: new Date().getTime() - 20000
        })).resolves.toBeInstanceOf(TimeSheet)
    })

    it('should be possible to an gerente set misset to any funcionário', () => {
        expect(updateTimeSheetUseCase.execute({
            adminId: gerenteUser.id,
            date: new Date(),
            userId: funcionarioUserFromAnotherStation.id,
            missed: true
        })).resolves.toBeInstanceOf(TimeSheet)
        expect(updateTimeSheetUseCase.execute({
            adminId: gerenteUser.id,
            date: new Date(),
            userId: funcionarioUser.id,
            missed: true
        })).resolves.toBeInstanceOf(TimeSheet)
    })

    

})