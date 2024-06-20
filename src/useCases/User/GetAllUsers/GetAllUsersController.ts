import { Request, Response } from "express";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";



export class GetAllUsersController {

    constructor(
        private getAllUsersUseCase: GetAllUsersUseCase
    ) {}


    async handle(request: Request, response: Response) {

        const userId = request.headers.userId as string
        try {
            const users = await this.getAllUsersUseCase.execute({ userId })

            return response.status(200).send({
                users
            })
        } catch (error: any) {
            return response.status(500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }

    }
}