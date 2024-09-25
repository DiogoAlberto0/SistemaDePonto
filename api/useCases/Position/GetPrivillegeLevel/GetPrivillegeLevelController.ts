import { GetPrivillegeLevelUseCase } from "./GetPrivillegeLevelUseCase"
import { Request, Response } from "express"
export class GetPrivillegeLevelControler {

    constructor(
        private getPrivillegeLevelUseCase: GetPrivillegeLevelUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const userId = request.headers.userId as string

        if(!userId) return response.status(401).send({
            message: 'Usuário não autênticado'
        })

        try {
            const privillegeLevel = await this.getPrivillegeLevelUseCase.execute({ userId })

            return response.status(200).send(privillegeLevel)
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }
    }
}