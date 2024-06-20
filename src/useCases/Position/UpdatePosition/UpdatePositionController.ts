import { Request, Response } from "express";
import { UpdatePositionUseCase } from "./UpdatePositionUseCase";



export class UpdatePositionController {
    

    constructor(
        private updatePositionUseCase: UpdatePositionUseCase
    ) { }

    async handle(request: Request, response: Response) {

        const { id } = request.params 
        const { privillegeLevel } = request.body

        if(!id || !privillegeLevel) return response.status(400).send({
            message: 'Informe o cargo e o nivel de privilégio'
        })

        try {
            await this.updatePositionUseCase.execute({
                id,
                privillegeLevel
            })

            return response.status(200).send({
                message: 'nivel de privilégio alterado com sucesso'
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