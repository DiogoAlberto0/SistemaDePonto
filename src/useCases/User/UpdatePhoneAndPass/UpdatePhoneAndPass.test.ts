import { describe, expect, it } from "vitest"

import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase"
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository"
const  positionRepository = new InMemoryPositionRepository()
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


import { UpdatePhoneAndPassUseCase } from "./UpdatePhoneAndPassUseCase"
import { ApiError } from "../../../entities/Error"
const updatePhoneAndPassUseCase = new UpdatePhoneAndPassUseCase(userRepository, positionRepository, new PasswordUtils())

describe('Update phone and password tests',async  () => {

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
        privillegeLevel:1
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

    it('should not be possible to change invalid password', async () => {
        const updatedUser = updatePhoneAndPassUseCase.execute({
            adminId: funcionario1.id,
            phone: '61984444444',
            password: 'Abc123456789'
        })
        await expect(updatedUser).rejects.toStrictEqual(new ApiError(400, 'A senha deve conter pelomenos 10 caracteres, 1 letra, 1 numero, e um especial'))
    })

    it('should not be possible to not authenticated user change password', async () => {
        const updatedUser = updatePhoneAndPassUseCase.execute({
            adminId: 'asdasd',
            phone: '61984444444',
            password: 'Abc123456789.'
        })
        await expect(updatedUser).rejects.toStrictEqual(new ApiError(401, 'Usuário não autorizado'))
    })

    it('should not be possible to  user with privilege level less 3 change phone and password from another user', async () => {

        const updatedUser = await updatePhoneAndPassUseCase.execute({
            adminId: funcionario1.id,
            phone: '61984444444',
            password: 'Abc123456789.'
        })
        expect(updatedUser.id).toStrictEqual(funcionario1.id)
        
    })

    it('should be possible to any user change their own phone and password', async () => {
        const updatedUser = await updatePhoneAndPassUseCase.execute({
            adminId: funcionario2.id,
            phone: '61981111111',
            password: 'Abc123456789.'
        })
        expect(updatedUser.id).toStrictEqual(funcionario2.id)
    })

    it('should not be possible to set phone number from another user', async () => {
        const updatedUser = updatePhoneAndPassUseCase.execute({
            adminId: funcionario2.id,
            phone: '61984272615',
            password: 'Abc123456789.'
        })
        await expect(updatedUser).rejects.toStrictEqual(new ApiError(400, 'Telefone ja cadastrado'))
    })
})