import { Request, Response } from "express";
import { SigninUserUseCase } from "./SigninUserUseCase";




export class SigninUserController {

    constructor(
        private singinUserUseCase: SigninUserUseCase
    ){}
    async handle(request: Request, response: Response) {

        const { phone, password } = request.body

        if(!phone || !password) return response.status(400).send({
            message: 'Informe usuário e senha'
        })

        try {
            const token = await this.singinUserUseCase.execute({ phone, password })
            
            return response.status(200).send({
                token
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