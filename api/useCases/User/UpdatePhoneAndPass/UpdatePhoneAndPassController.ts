import { Request, Response } from "express"
import { UpdatePhoneAndPassUseCase } from "./UpdatePhoneAndPassUseCase"


export class UpdatePhoneAndPassController {

    constructor(
        private updatePhoneAndPassUseCase: UpdatePhoneAndPassUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string
        
        
        if(!adminId) return response.status(401).send({
            message: 'usuário não autorizado'
        })

        const { phone, password } = request.body

        if(!phone || !password) return response.status(400).send({
            message: 'Informe telefone e senha'
        })

        try {
            const user = await this.updatePhoneAndPassUseCase.execute({ adminId, phone, password })

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