import { Request, Response } from "express";
import { GetMonthsAndYearsUseCase } from "./GetMonthsAndYearsUseCase";



export class GetMonthsAndYearsController {

    constructor(
        private getMonthsAndYearsUseCase: GetMonthsAndYearsUseCase
    ) {}

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string
        if(!adminId) return response.status(401).send({
            message: 'Usuário não autenticado'
        })

        const { userId } = request.query


        try {
            const monthsAndYears = await this.getMonthsAndYearsUseCase.execute({
                adminId,
                userId: userId ? userId.toString() : adminId,
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