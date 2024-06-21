import { it, expect, describe } from "vitest";

import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
const passwordUtilsUtils = new PasswordUtils()

import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase";
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase";
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)


import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
const userRepository = new InMemoryUserDatabase()
const createUserUseCase = new CreateUserUseCase(userRepository, passwordUtilsUtils, stationRepository, positionRepository)


import { GetAllUsersUseCase } from "./GetAllUsersUseCase";
import { ApiError } from "../../../entities/Error";
const getAllUserUseCase = new GetAllUsersUseCase(userRepository, positionRepository)


describe('get all users tests', async () => {
    const station = await createStationUseCase.execute({
        name: 'Me põe na história',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.000,
            longitude: -15.000
        }
    })
    
    const station2 = await createStationUseCase.execute({
        name: 'Orca',
        cnpj: '89.688.613/0001-77',
        coords: {
            latitude: -15.000,
            longitude: -15.000
        }
    })
    
    const funcionario = await createPositionUseCase.execute({
        office: 'funcionário',
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
    
    const user = await createUserUseCase.execute({
        name: 'Diogo',
        phone: '61986548270',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: encarregado.id
    })
    
    const user2 = await createUserUseCase.execute({
        name: 'Alberto',
        phone: '61986548271',
        password: '123456789Abc.',
        stationId: station2.id,
        positionId: gerente.id
    })
    
    const user3 = await createUserUseCase.execute({
        name: 'Fulano',
        phone: '61986548273',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: funcionario.id
    })

    it('should be to gerente get all users', async () => {
        expect(getAllUserUseCase.execute({ userId: user2.id })).resolves.toStrictEqual([user, user2, user3])
    })

    it('should be to encarregado get all users from the same station', async () => {
        expect(getAllUserUseCase.execute({ userId: user.id })).resolves.toStrictEqual([user, user3])
    })

    it('should not be to funcionário get nothing user', async () => {
        expect(getAllUserUseCase.execute({ userId: user3.id })).rejects.toStrictEqual(new ApiError(401, 'Usuário não autorizado'))
    })

})