import { Request, Response } from "express";
import { GetTimeSheetUseCase } from "./GetTimeSheetUseCase";



export class GetTimeSheetController {

    constructor(
        private getTimeSheetUseCase: GetTimeSheetUseCase 
    ) {}

    async handle( request: Request, response: Response) {

        const adminId = request.headers.userId as string

        const { userId, year, month } = request.query

        if(!adminId) return response.status(401).send({
            message: 'Usuário não autenticado'
        })

        if(!userId || !year || ! month) return response.status(400).send({
            message: 'Informe o funcionário o ano e o mês'
        })

        const yearNumber = Number(year)
        const monthNumber = Number(month)

        if (isNaN(yearNumber) || isNaN(monthNumber)) {
            return response.status(400).send({
                message: 'Ano e mês devem ser números válidos'
            });
        }
        try {
            const timeSheet = await this.getTimeSheetUseCase.execute({
                adminId,
                userId: userId.toString(),
                year: yearNumber,
                month: monthNumber
            })
    
            return response.status(200).send({
                timeSheet
            })
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }


    }
}