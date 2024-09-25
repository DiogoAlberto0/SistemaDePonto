import { describe, it, expect } from "vitest";
import { ApiError } from "../../../entities/Error";

//utils
import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
import { DateUtils } from "../../../utils/date/implementation/DateUtils";

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
import { SetMedicalCertificateUseCase } from "./SetMedicalCertificateUseCase";
const timeSheetRepository = new InMemoryTimeSheetRepository()
const setMedicalCertificateUseCase = new SetMedicalCertificateUseCase(timeSheetRepository,userRepository, positionRepository, new DateUtils())

describe('set misset to timesheet tests', async () => {

    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '23.257.309/0001-67',
        coords: {
            latitude: -15.032,
            longitude: -15.015
        }
    })
    const station2 = await createStationUseCase.execute({
        name: 'Orca',
        cnpj: '18.980.366/0001-30',
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

    it('should not be able to funcionario set medical certificate from another funcionario', () => {
        expect(
            setMedicalCertificateUseCase.execute({
                adminId: funcionarioUser.id,
                userId: funcionarioUserFromAnotherStation.id,
                startsAt: new Date(),
                endsAt: new Date(new Date().getUTCDate() + 7)
            })
        ).rejects.toBeInstanceOf(ApiError)
    })

    it('should not be able to set medical certificate if encarregado not is from same station funcionario', () => {
        expect(
            setMedicalCertificateUseCase.execute({
                adminId: encarregadoUser.id,
                userId: funcionarioUserFromAnotherStation.id,
                startsAt: new Date(),
                endsAt: new Date(new Date().getUTCDate() + 7)
            })
        ).rejects.toBeInstanceOf(ApiError)
    })

    it('should be able to encarregado set medical certificate from funcionario from the same station', async () => {

        const result = await setMedicalCertificateUseCase.execute({
            adminId: encarregadoUser.id,
            userId: funcionarioUser.id,
            startsAt: new Date(),
            endsAt: new Date(new Date().getUTCDate() + 7)
        })
        expect(result).toBeInstanceOf(Array)

        result.forEach(date => expect(date).toBeInstanceOf(Date))
    })

    it('should be able to gerente set medical certificate from funcionario from any station', async () => {

        const result = await setMedicalCertificateUseCase.execute({
            adminId: encarregadoUser.id,
            userId: funcionarioUser.id,
            startsAt: new Date(),
            endsAt: new Date(new Date().getUTCDate() + 7)
        })
        expect(result).toBeInstanceOf(Array)

        result.forEach(date => expect(date).toBeInstanceOf(Date))

        const result2 = await setMedicalCertificateUseCase.execute({
            adminId: gerenteUser.id,
            userId: funcionarioUserFromAnotherStation.id,
            startsAt: new Date(),
            endsAt: new Date(new Date().getUTCDate() + 7)
        })
        expect(result2).toBeInstanceOf(Array)

        result2.forEach(date => expect(date).toBeInstanceOf(Date))
    })


})