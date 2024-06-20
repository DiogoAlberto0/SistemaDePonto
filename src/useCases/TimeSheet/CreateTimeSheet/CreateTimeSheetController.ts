import { Request, Response } from "express";
import { CreateTimeSheetUseCase } from "./CreateTimeSheetUseCase";




export class CreateTimeSheetController {

    constructor(
        private createTimeSheetUseCase: CreateTimeSheetUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const userId = request.headers.userId as string
        
        if(!userId) return response.status(401).send({
            message: 'Não autorizado'
        })

        const { latitude, longitude } = request.body
        if(!latitude || !longitude) return response.status(400).send({
            message: 'Não foi possivel localizar o dispositivo'
        })

        try {
            await this.createTimeSheetUseCase.execute({
                userId,
                latitude,
                longitude,
                createdAt: new Date()
            })

            return response.status(200).send({
                message: 'Registro efetuado!'
            })
        } catch (error: any) {
            return response.status(400).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }
    }

}