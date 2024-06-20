import { NextFunction, Request, Response } from "express";
import { ValidateUserUseCase } from "./ValidateUserUseCase";



export class ValidateUserController {

    constructor(
        private validateUserUseCase: ValidateUserUseCase
    ) {}

    async handle(request: Request, response: Response, next: NextFunction, privillegeLevel: number) {

        const token = request.headers.authorization

        if(!token) return response.status(401).send({
            message: 'Usuário não autorizado'
        })

        try {
            const { userId } = await this.validateUserUseCase.execute({ token, privillegeLevel })
            if(!userId) return response.status(401).send('Usuário não autorizado')

            request.headers.userId = userId
            next()
        } catch (error: any) {
            response.status(500).send({
                message: error.message || 'Unexpected error'
            })
        }

    }
}