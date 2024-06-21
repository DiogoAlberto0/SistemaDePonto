import { describe, it, expect } from "vitest";
import { ApiError } from "../../../entities/Error";
import { TimeSheet } from "../../../entities/TimeSheet";

//positoion
import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase";
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

//station
import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase";
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

//user
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { CreateUserUseCase } from "../../User/CreateUser/CreateUserUseCase";
import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
const userRepository = new InMemoryUserDatabase()
const passwordUtilsUtils = new PasswordUtils()
const createUserUseCase = new CreateUserUseCase(userRepository, passwordUtilsUtils, stationRepository, positionRepository) 

//timeSheet
import { InMemoryTimeSheetRepository } from "../../../repositories/implementations/inMemoryTimeSheetRepository";
import { CreateTimeSheetUseCase } from "../CreateTimeSheet/CreateTimeSheetUseCase";
import { CoordUtils } from "../../../utils/coord/implementation/coordUtils";
import { GetMonthsAndYearsUseCase } from "./GetMonthsAndYearsUseCase";

const coordUtils = new CoordUtils()
const timeSheetRepository = new InMemoryTimeSheetRepository()
const createTimeSheetUseCase = new CreateTimeSheetUseCase(timeSheetRepository, userRepository, stationRepository, coordUtils)
const getMonthsAndYearsUseCase = new GetMonthsAndYearsUseCase(userRepository, positionRepository, timeSheetRepository)

describe('get time sheet tests', async () => {

    const funcionario = await createPositionUseCase.execute({
        office: 'funcionario',
        privillegeLevel: 1
    })
    const encarregado = await createPositionUseCase.execute({
        office: 'encarregado',
        privillegeLevel: 2
    })
    const gerente = await createPositionUseCase.execute({
        office: 'gerente',
        privillegeLevel: 3
    })

    const station1 = await createStationUseCase.execute({
        name: 'Me põe na hisótia',
        cnpj: '89.688.613/0001-77',
        coords: {
            latitude: 15.000,
            longitude: 15.000
        }
    })
    const station2 = await createStationUseCase.execute({
        name: 'Orca',
        cnpj: '24.677.014/0001-02',
        coords: {
            latitude: 10.000,
            longitude: 10.000
        }
    })

    const userGerente = await createUserUseCase.execute({
        name: 'Vitor',
        phone: '61986548273',
        password: '123456789Abc.',
        positionId: gerente.id,
        stationId: station1.id
    })

    const userEncarregado1 = await createUserUseCase.execute({
        name: 'Vitor hugo',
        phone: '61986548272',
        password: '123456789Abc.',
        positionId: encarregado.id,
        stationId: station1.id
    })

    const userFuncionario1 = await createUserUseCase.execute({
        name: 'Vitor hugo',
        phone: '61986548270',
        password: '123456789Abc.',
        positionId: funcionario.id,
        stationId: station1.id
    })

    const userFuncionario2 = await createUserUseCase.execute({
        name: 'Geovanne',
        phone: '61986548271',
        password: '123456789Abc.',
        positionId: funcionario.id,
        stationId: station2.id
    })

    const funcionario1TimeSheet = await createTimeSheetUseCase.execute({
        userId: userFuncionario1.id,
        createdAt: new Date(),
        latitude: 15.000,
        longitude: 15.000
    })

    const funcionario2TimeSheet = await createTimeSheetUseCase.execute({
        userId: userFuncionario2.id,
        createdAt: new Date(),
        latitude: 10.000,
        longitude: 10.000
    })


    it('should not be possible to a funcionario get timeSheet from another funcionario', async () => {
        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userFuncionario1.id,
                userId: userFuncionario2.id,
            })
        ).resolves.toStrictEqual([{ year: funcionario1TimeSheet.props.registeredYear, month: funcionario1TimeSheet.props.registeredMonth }])
    })

    it('should not be possible to an encarregado get user timesheet from another station', async () => {
        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userEncarregado1.id,
                userId: userFuncionario2.id,
            })
        ).rejects.toStrictEqual(new ApiError(401, 'Usuário não autorizado'))
    })

    it('should be possible to funcionario get timesheet from yourself', async () => {
        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userFuncionario1.id,
                userId: userFuncionario2.id,
            })
        ).resolves.toStrictEqual([{ year: funcionario1TimeSheet.props.registeredYear, month: funcionario1TimeSheet.props.registeredMonth }])

        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userFuncionario2.id,
                userId: userFuncionario2.id,
            })
        ).resolves.toStrictEqual([{ year: funcionario2TimeSheet.props.registeredYear, month: funcionario2TimeSheet.props.registeredMonth }])
    })

    it('should be possible to encarregado get timeSheet from any funcionario from the same station', async () => {
        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userEncarregado1.id,
                userId: userFuncionario1.id,
            })
        ).resolves.toStrictEqual([{ year: funcionario1TimeSheet.props.registeredYear, month: funcionario1TimeSheet.props.registeredMonth }])
    })

    it('should be possible to a gerente get a timeSheet from any user', async () => {
        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userGerente.id,
                userId: userFuncionario1.id,
            })
        ).resolves.toStrictEqual([{ year: funcionario1TimeSheet.props.registeredYear, month: funcionario1TimeSheet.props.registeredMonth }])

        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userGerente.id,
                userId: userFuncionario2.id,
            })
        ).resolves.toStrictEqual([{ year: funcionario2TimeSheet.props.registeredYear, month: funcionario2TimeSheet.props.registeredMonth }])

        await expect(
            getMonthsAndYearsUseCase.execute({
                adminId: userGerente.id,
                userId: userEncarregado1.id,
            })
        ).resolves.toStrictEqual([])
    })
})