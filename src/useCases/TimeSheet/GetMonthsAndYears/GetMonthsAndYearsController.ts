import { Request, Response } from "express";
import { GetMonthsAndYearsUseCase } from "./GetMonthsAndYearsUseCase";



export class GetMonthsAndYearsController {

    constructor(
        private getMonthsAndYearsUseCase: GetMonthsAndYearsUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userID as string
        if(!adminId) return response.status(401).send({
            message: 'Usuário não autenticado'
        })

        const { userId } = request.query
        if(!userId) return response.status(400).send({
            message: 'Informe o usuário'
        })



        try {
            const monthsAndYears = await this.getMonthsAndYearsUseCase.execute({
                adminId,
                userId: userId.toString(),
            })

            return response.status(200).send({
                monthsAndYears
            })
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }
    }
}