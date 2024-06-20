import { Request, Response } from "express";
import { UpdateTimeSheetuseCase } from "./UpdateTimeSheetUseCase";



export class UpdateTimeSheetController {

    constructor(
        private updateTimeSheetUseCase: UpdateTimeSheetuseCase
    ) { }

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string

        const {
            date,
            first_entrance,
            first_exit,
            second_entrance,
            second_exit,
            missed
        } = request.body

        const { userId } = request.params

        if (!userId || !date) return response.status(400).send({
            message: 'Informe o funcionário e a data para alteração'
        })

        try {
            await this.updateTimeSheetUseCase.execute({
                userId,
                date,
                adminId,
                first_entrance,
                first_exit,
                second_entrance,
                second_exit,
                missed
            })

            return response.status(200).send({
                message: 'Folha de ponto atualizada com sucesso'
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