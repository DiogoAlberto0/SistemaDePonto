import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";



export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) { }

    async handle(request: Request, response: Response) {

        const { userId } = request.headers

        const { name, phone, password, positionId, stationId } = request.body

        if (!name || !phone || !password || !positionId || !stationId ) return response.status(400).send({
            message: 'Informe todos os dados necessários.'
        })

        try {
            await this.createUserUseCase.execute({
                name,
                phone,
                password,
                positionId,
                stationId
            })

            return response.status(201).send({
                message: 'Usuário criado com sucesso'
            })
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Unexpected error'
            })
        }
    }
}