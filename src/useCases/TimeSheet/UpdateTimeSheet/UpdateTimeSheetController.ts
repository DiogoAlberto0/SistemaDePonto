import { Request, Response } from "express";
import { UpdateTimeSheetuseCase } from "./UpdateTimeSheetUseCase";



export class UpdateTimeSheetController {

    constructor(
        private updateTimeSheetUseCase: UpdateTimeSheetuseCase
    ) { }

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string

        const {
            registeredDay,
            registeredMonth,
            registeredYear,
            first_entrance,
            first_exit,
            second_entrance,
            second_exit,
            missed
        } = request.body

        const { userId } = request.params

        if (!userId || !registeredDay || !registeredMonth || !registeredYear) return response.status(400).send({
            message: 'Informe o funcionário o dia mes e ano para alteração'
        })

        try {
            await this.updateTimeSheetUseCase.execute({
                userId,
                registeredDay,
                registeredMonth,
                registeredYear,
                adminId,
                first_entrance,
                first_exit,
                second_entrance,
                second_exit,
                missed,
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