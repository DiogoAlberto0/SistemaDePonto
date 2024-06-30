import { describe, expect, it } from "vitest"

import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase"
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository"
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase"
import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase"
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils"
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase"
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase"
import { PasswordUtils } from "../../../utils/password/implementation/password.utils"
const userRepository = new InMemoryUserDatabase()
const createUserUseCase = new CreateUserUseCase(userRepository, new PasswordUtils(), stationRepository, positionRepository)


import { UpdateUserUseCase } from "./UpdateUserUseCase"
import { ApiError } from "../../../entities/Error"
import { User } from "../../../entities/User"
import { response } from "express"
const updateUserUseCase = new UpdateUserUseCase(userRepository, positionRepository, new PasswordUtils())

describe('Update phone and password tests', async () => {

    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '01.346.400/0001-16',
        coords: {
            latitude: -1,
            longitude: -1
        }
    })

    const positionLevel1 = await createPositionUseCase.execute({
        office: 'funcionario',
        privillegeLevel: 1
    })
    const positionLevel3 = await createPositionUseCase.execute({
        office: 'chefe',
        privillegeLevel: 3
    })

    const funcionario1 = await createUserUseCase.execute({
        name: 'Vitor hugo',
        phone: '61985555555',
        password: '123456789Abc.',
        positionId: positionLevel1.id,
        stationId: station.id
    })

    const funcionario2 = await createUserUseCase.execute({
        name: 'Geovanne',
        phone: '61985555522',
        password: '123456789Abc.',
        positionId: positionLevel1.id,
        stationId: station.id
    })

    const gerente = await createUserUseCase.execute({
        name: 'Vitor',
        phone: '61984272615',
        password: '123456789Abc.',
        positionId: positionLevel3.id,
        stationId: station.id
    })

    it('should be to a user with privillege more then 3 update any user', async () => {

        const response = await updateUserUseCase.execute({
            userId: funcionario2.id,
            adminId: gerente.id,
            name: 'Geovane',
            password: '9876543210Abc.',
            phone: '61985552222',
            positionId: funcionario2.props.positionId,
            stationId: funcionario2.props.stationId,
        })
        expect(response.id).toStrictEqual(funcionario2.id)
    })

    it('should not be possible to a user with privillege level less then 3 update any user', async () => {
        const response = updateUserUseCase.execute({
            userId: funcionario2.id,
            adminId: funcionario2.id,
            name: 'Geovane',
            password: '9876543210Abc.',
            phone: '61985552222',
            positionId: funcionario2.props.positionId,
            stationId: funcionario2.props.stationId,
        })
        await expect(response).rejects.toStrictEqual(new ApiError(401, 'Usuário não autorizado'))
    })
})