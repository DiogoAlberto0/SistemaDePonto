import { describe, it, expect } from "vitest";
import { ApiError } from "../../../entities/Error";

//Station
import { CnpjUtils } from "../../../utils/cnpj/implementation/CnpjUtils";
import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase";
import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase";
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

//Position
import { InMemoryPositionRepository } from "../../../repositories/implementations/inMemoryPositionRepository";
import { CreatePositionUseCase } from "../../Position/CreatePosition/CreatePositionUseCase";
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

//USER
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase";
import { HashPassword } from "../../../utils/hash/implementation/hashPassword.utils";
import { TokenUtils } from "../../../utils/jwt/implementation/token.utils";

const userRepository = new InMemoryUserDatabase()
const tokenUtils = new TokenUtils()
const hashPasswordUtils = new HashPassword()
//CreateUserUseCase
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
const createUserUseCase = new CreateUserUseCase(userRepository, hashPasswordUtils, stationRepository, positionRepository)

//signinUseCase
import { SigninUserUseCase } from "../SigninUser/SigninUserUseCase";
import { ValidateUserUseCase } from "./ValidateUserUseCase";
const signinUseCase = new SigninUserUseCase(userRepository, hashPasswordUtils, tokenUtils)

//validateUser
const validateUserUseCase = new ValidateUserUseCase(userRepository, positionRepository, tokenUtils)

describe('validate users tests', async () => {

    const position = await createPositionUseCase.execute({
        office: 'funcionário',
        privillegeLevel: 1
    })

    const station = await createStationUseCase.execute({
        name: 'Me põe na história day care',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.032,
            longitude: -15.015
        }
    })

    const user = await createUserUseCase.execute({
        name: 'Fulano',
        phone: '61986548270',
        password: '123456789Abc.',
        positionId: position.id,
        stationId: station.id
    })

    const token = await signinUseCase.execute({
        phone: '61986548270',
        password: '123456789Abc.'
    })


    it('should not be possible to validate user with an invalid token', () => {
        expect(
            validateUserUseCase.execute({
                token: 'anytoken',
                privillegeLevel: 1
            })
        ).rejects.toThrow(ApiError)
    })

    it('should not be possible to validate user with a privillegeLevel less than required', () => {
        expect(
            validateUserUseCase.execute({
                token: token,
                privillegeLevel: 2
            })
        ).rejects.toThrow(ApiError)
    })

    it('sholud be to validate user', () => {
        expect(
            validateUserUseCase.execute({
                token: token,
                privillegeLevel: 1
            })
        ).resolves.toStrictEqual({ userId: user.id })
    })
})