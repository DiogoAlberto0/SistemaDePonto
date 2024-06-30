import { Request, Response } from "express";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";



export class GetUserByIdController {

    constructor(
        private getUserByIdUseCase: GetUserByIdUseCase
    ) { }


    async handle(request: Request, response: Response) {

        const adminId = request.headers.userId as string

        const userId = request.query.userId as string

        try {
            const user = await this.getUserByIdUseCase.execute({ userId, adminId })

            if (!user) return ({
                user: undefined
            })

            return response.status(200).send({
                user: {
                    id: user.user.id,
                    props: {
                        name: user.user.props.name,
                        phone: user.user.props.phone,
                        hash: '',
                        positionId: user.user.props.positionId,
                        stationId: user.user.props.stationId
                    }
                },
                station: user.station,
                position: user.position
            })
        } catch (error: any) {
            return response.status(500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }

    }
}