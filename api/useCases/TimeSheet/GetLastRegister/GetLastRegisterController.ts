import { Request, Response } from "express";
import { GetLastRegisterUseCase } from "./GetLastRegisterUseCase";



export class GetLastRegisterController {

    constructor(
        private getLastRegisterUseCase: GetLastRegisterUseCase
    ) { }

    async handle(request: Request, response: Response) {

        
        const adminId = request.headers.userId as string

        if (!adminId) return response.status(401).send({
            message: 'Usuário não autenticado'
        })
        
        try {
            
            
            const lastRegister = await this.getLastRegisterUseCase.execute({ userId: adminId })

            
            if (!lastRegister) return response.status(200).send({
                lastRegister: null
            })

            const {
                id,
                props: {
                    registeredDay,
                    registeredMonth,
                    registeredYear,
                    userId,
                    clockin: {
                        first_entrance,
                        first_exit,
                        second_entrance,
                        second_exit,
                        missed,
                        medicalCertificate
                    }
                }
            } = lastRegister


            return response.status(200).send({
                lastRegister: {
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
                }
            })
        } catch (error: any) {
            return response.status(error.status || 500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }


    }
}