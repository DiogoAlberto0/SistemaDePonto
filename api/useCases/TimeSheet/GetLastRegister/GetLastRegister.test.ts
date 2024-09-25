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
import { GetLastRegisterUseCase } from "./GetLastRegisterUseCase";

const coordUtils = new CoordUtils()
const timeSheetRepository = new InMemoryTimeSheetRepository()
const createTimeSheetUseCase = new CreateTimeSheetUseCase(timeSheetRepository, userRepository, stationRepository, coordUtils)
const getLastRegisterUseCase = new GetLastRegisterUseCase(timeSheetRepository, userRepository)

describe('get time sheet tests', async () => {

    const funcionario = await createPositionUseCase.execute({
        office: 'funcionario',
        privillegeLevel: 1
    })

    const station1 = await createStationUseCase.execute({
        name: 'Me põe na hisótia',
        cnpj: '89.688.613/0001-77',
        coords: {
            latitude: 15.000,
            longitude: 15.000
        }
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
        stationId: station1.id
    })

    const funcionario1TimeSheet = await createTimeSheetUseCase.execute({
        userId: userFuncionario1.id,
        createdAt: new Date(),
        latitude: 15.000,
        longitude: 15.000
    })



    it('should be possible to a funcionario get last register from youself', async () => {
        await expect(
            getLastRegisterUseCase.execute({ userId: userFuncionario1.id})
        ).resolves.toStrictEqual(funcionario1TimeSheet)
    })

})