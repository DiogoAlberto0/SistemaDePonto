import { Request, Response } from "express";
import { CreatePositionUseCase } from "./CreatePositionUseCase";



export class CreatePositionController {

    constructor(
        private createPositionUseCase: CreatePositionUseCase
    ) { }

    async handle(request: Request, response: Response) {

        const { office, privillegeLevel } = request.body

        if(!office || !privillegeLevel) return response.status(400).send({
            message: 'Informe o cargo e o nivel de privilégio'
        })

        try {
            await this.createPositionUseCase.execute({
                office,
                privillegeLevel
            })

            return response.status(201).send({
                message: 'Cargo criado com sucesso'
            })
        } catch (error: any) {
            const status = error.status || 500
            const message = error.message || 'Ocorreu um erro inesperado'

            return response.status(status).send({
                message
            })
        }
    }
}