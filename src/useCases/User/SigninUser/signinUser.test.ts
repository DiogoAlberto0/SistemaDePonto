//vitest
import { describe, it, expect } from 'vitest'

//stationUseCase
import { CnpjUtils } from '../../../utils/cnpj/implementation/CnpjUtils'
import { CreateStationUseCase } from "../../Station/CreateStation/CreateStationUseCase"
import { InMemoryStationDatabase } from "../../../repositories/implementations/inMemoryStationDatabase"
const stationRepository = new InMemoryStationDatabase()
const createStationUseCase = new CreateStationUseCase(stationRepository, new CnpjUtils())

//positionUseCase
import { InMemoryPositionRepository } from '../../../repositories/implementations/inMemoryPositionRepository'
import { CreatePositionUseCase } from '../../Position/CreatePosition/CreatePositionUseCase'
const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

//userUseCase
import { InMemoryUserDatabase } from "../../../repositories/implementations/inMemoryUserDatabase"
import { HashPassword } from "../../../utils/hash/implementation/hashPassword.utils"
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase"
const hashPass = new HashPassword()
const userRepository = new InMemoryUserDatabase()
const createUserUseCase = new CreateUserUseCase(userRepository, hashPass, stationRepository, positionRepository)

//signinUseCase
import { TokenUtils } from "../../../utils/jwt/implementation/token.utils"
import { SigninUserUseCase } from "./SigninUserUseCase"
import { ApiError } from '../../../entities/Error'
const tokenUtils = new TokenUtils()
const signinUserUseCase = new SigninUserUseCase(userRepository, hashPass, tokenUtils)



describe('Signin use case tests', async () => {

    //create a new station
    const station = await createStationUseCase.execute({
        name: 'Me põe na história day care',
        cnpj: '19.957.082/0001-95',
        coords: {
            latitude: -15.000,
            longitude: -15.001
        }
    })

    //create a new position
    const position = await createPositionUseCase.execute({
        office: 'funcionário',
        privillegeLevel: 1
    })

    //create a new user
    const user = await createUserUseCase.execute({
        name: 'Diogo',
        phone: '(61)98654-8270',
        password: '1234567890Ab.',
        stationId: station.id,
        positionId: position.id
    })
    

    it('should not be possible to signin with a not existent user', () => {
        expect(signinUserUseCase.execute({
            phone: '123',
            password: '123'
        })).rejects.toBeInstanceOf(ApiError)
    })

    it('should not be possible to signin with a incorrect password', () => {
        expect(signinUserUseCase.execute({
            phone: '61986548270',
            password: '123'
        })).rejects.toBeInstanceOf(ApiError)
    })

    it('should be possible to signin', () => {
        expect(signinUserUseCase.execute({
            phone: '61986548270',
            password: '1234567890Ab.'
        })).resolves.toBeTypeOf('string')

        expect(signinUserUseCase.execute({
            phone: '(61)98654-8270',
            password: '1234567890Ab.'
        })).resolves.toBeTypeOf('string')
    })


})