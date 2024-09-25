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

        if(!year || ! month) return response.status(400).send({
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
                userId: userId ? userId.toString() : adminId,
                year: yearNumber,
                month: monthNumber
            })

            const timeSheetResponse = timeSheet.map(({
                id,
                props: {
                    userId,
                    registeredDay,
                    registeredMonth,
                    registeredYear,
                    clockin: {
                        first_entrance,
                        first_exit,
                        second_entrance,
                        second_exit,
                        missed,
                        medicalCertificate
                    }
                }
            }) => ({
                id,
                props: {
                    userId,
                    registeredDay,
                    registeredMonth,
                    registeredYear,
                    clockin: {
                        first_entrance: Number(first_entrance),
                        first_exit: Number(second_entrance),
                        second_entrance: Number(first_exit),
                        second_exit: Number(second_exit),
                        missed,
                        medicalCertificate
                    }
                }
            }))

            return response.status(200).send({
                timeSheet: timeSheetResponse
            })
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }


    }
}