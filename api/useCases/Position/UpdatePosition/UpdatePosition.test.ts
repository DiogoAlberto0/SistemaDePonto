import { describe, it, expect } from 'vitest'
import { UpdatePositionUseCase } from './UpdatePositionUseCase'
import { InMemoryPositionRepository } from '../../../repositories/implementations/inMemoryPositionRepository'
import { CreatePositionUseCase } from '../CreatePosition/CreatePositionUseCase'
import { ApiError } from '../../../entities/Error'
import { Position } from '../../../entities/Position'

describe('Update Position tests', async () => {

    const positioRepository = new InMemoryPositionRepository()

    const updatePositionUseCase = new UpdatePositionUseCase(positioRepository)
    const createPositionUseCase = new CreatePositionUseCase(positioRepository)

    const createdPosition = await createPositionUseCase.execute({
        office: 'Diretor',
        privillegeLevel: 5
    })

    it('should not be able to update a not existent position', () => {
        expect(
            updatePositionUseCase.execute({
                id: '123',
                privillegeLevel: 1
            })
        ).rejects.toStrictEqual(new ApiError(400, 'Cargo não cadastrado'))
    })

    it('should be able to update a existent position', () => {
        expect(
            updatePositionUseCase.execute({
                id: createdPosition.id,
                privillegeLevel: 1
            })
        ).resolves.toStrictEqual(new Position(
            {
                office: createdPosition.props.office, 
                privillegeLevel: 1
            }, 
            createdPosition.id
        ))
    })





})