import { Request, Response } from "express"
import { UpdateUserUseCase } from "./UpdateUserUseCase"


export class UpdateUserController {

    constructor(
        private updateUserUseCase: UpdateUserUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string
        
        
        if(!adminId) return response.status(401).send({
            message: 'usuário não autorizado'
        })

        const { name, phone, password, positionId, stationId } = request.body

        const userId = request.params.userId as string
        if(!phone || !password || !name || !password || !userId || !positionId || !stationId) return response.status(400).send({
            message: 'Informe usuário, nome, telegofe, senha, posto e o cargo'
        })

        try {
            const user = await this.updateUserUseCase.execute({ 
                adminId,
                userId,
                name,
                phone,
                password,
                positionId,
                stationId
            })

            return response.status(200).send({
                message: 'Usuário atualizado com sucesso'
            })
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }
    }
}