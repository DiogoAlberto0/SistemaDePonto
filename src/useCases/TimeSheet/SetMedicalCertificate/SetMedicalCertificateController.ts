import { Request, Response } from "express";
import { SetMedicalCertificateUseCase } from "./SetMedicalCertificateUseCase";



export class SetMedicalCertificateController {

    constructor(
        private setMedicalCertificateUseCase: SetMedicalCertificateUseCase
    ) {

    }

    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string
        const { userId } = request.params

        const {
            startsAt,
            endsAt
        } = request.body

        if (!adminId) return response.status(401).send({ message: 'Usuário não autenticado' })
        if (!userId) return response.status(400).send({ message: 'Informe o funcionário que deseja cadastrar o atestado' })
        if (!startsAt || !endsAt) return response.status(400).send({ message: 'Informe a data de inicio e término do atestado' })

        try {
            await this.setMedicalCertificateUseCase.execute({
                adminId,
                userId,
                startsAt: new Date(startsAt),
                endsAt: new Date(endsAt)
            })

            return response.status(200).send({
                message: 'Atestado cadastrado com sucesso'
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