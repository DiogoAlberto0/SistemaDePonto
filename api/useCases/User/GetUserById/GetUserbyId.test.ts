import { it, expect, describe } from "vitest";

import { PasswordUtils } from "../../../utils/password/implementation/password.utils";
const passwordUtilsUtils = new PasswordUtils()

import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase";
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
export const getUserByIdTestStationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(getUserByIdTestStationRepository, new CnpjUtils())

import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase";
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
export const getUserByIdTestPositionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(getUserByIdTestPositionRepository)


import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
const userRepository = new InMemoryUserDatabase()
const createUserUseCase = new CreateUserUseCase(userRepository, passwordUtilsUtils, getUserByIdTestStationRepository, getUserByIdTestPositionRepository)


import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { User } from "../../../entities/User";
import { ApiError } from "../../../entities/Error";
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository, getUserByIdTestPositionRepository)


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

    userRepository.station.push(station, station2)
    userRepository.position.push(funcionario, encarregado, gerente)
    
    const encarregadoUser = await createUserUseCase.execute({
        name: 'Diogo',
        phone: '61986548270',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: encarregado.id
    })
    
    const gerenteUser = await createUserUseCase.execute({
        name: 'Alberto',
        phone: '61986548271',
        password: '123456789Abc.',
        stationId: station2.id,
        positionId: gerente.id
    })
    
    const funcionarioUser = await createUserUseCase.execute({
        name: 'Fulano',
        phone: '61986548273',
        password: '123456789Abc.',
        stationId: station.id,
        positionId: funcionario.id
    })

    it('should be to gerente get all users', async () => {
        expect(getUserByIdUseCase.execute({ adminId: gerenteUser.id, userId: gerenteUser.id})).resolves.toStrictEqual({
            user: gerenteUser, 
            station: station2, 
            position: gerente 
        })
        expect(getUserByIdUseCase.execute({ adminId: gerenteUser.id, userId: encarregadoUser.id})).resolves.toStrictEqual({
            user: encarregadoUser, 
            station: station, 
            position: encarregado 
        })
        expect(getUserByIdUseCase.execute({ adminId: gerenteUser.id, userId: funcionarioUser.id})).resolves.toStrictEqual({
            user: funcionarioUser, 
            station: station, 
            position: funcionario 
        })
    })

    it('should be to encarregado get all users from the same station', async () => {
        expect(getUserByIdUseCase.execute({ adminId: encarregadoUser.id, userId: funcionarioUser.id })).resolves.toStrictEqual({
            user: funcionarioUser, 
            station: station, 
            position: funcionario 
        })
    })

    it('should not be to encarregado get users from another station', async () => {
        expect(getUserByIdUseCase.execute({ adminId: encarregadoUser.id, userId: gerenteUser.id })).resolves.toStrictEqual({
            user: encarregadoUser,
            position: encarregado,
            station: station
        })
    })

    it('should not be to funcionário get another user only yourself', async () => {
        expect(getUserByIdUseCase.execute({ adminId: funcionarioUser.id, userId: encarregadoUser.id })).resolves.toStrictEqual({
            user: funcionarioUser,
            position: funcionario,
            station: station
        })
    })

})