import { describe, it, expect } from 'vitest'

import { Position } from '../../../entities/Position'

import { CreatePositionUseCase } from './CreatePositionUseCase'
import { InMemoryPositionRepository } from '../../../repositories/implementations/inMemoryPositionRepository'

const positionRepository = new InMemoryPositionRepository()
const createPositionUseCase = new CreatePositionUseCase(positionRepository)

describe('create position tests', () => {

    it('should not be possible to create a position with a existent office', async () => {

        await createPositionUseCase.execute({
            office: 'Diretor',
            privillegeLevel: 1
        })


        expect(
            createPositionUseCase.execute({
                office: 'Diretor',
                privillegeLevel: 5
            })
        ).rejects.toThrow('Cargo ja existente')
    })


    it('shold be possible to create a new position', () => {
        expect(
            createPositionUseCase.execute({
                office: 'funcionário',
                privillegeLevel: 1
            })
        ).resolves.toBeInstanceOf(Position)
    })
})