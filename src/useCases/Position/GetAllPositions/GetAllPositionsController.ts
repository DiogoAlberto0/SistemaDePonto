import { Request, Response } from "express";
import { GetAllPositionsUseCase } from "./GetAllPositionsUseCase";



export class GetAllPositionsController {

    constructor(
        private getAllPositionsUseCase: GetAllPositionsUseCase
    ){}

    async handle(request: Request, response: Response) {

        try {
            const positions = await this.getAllPositionsUseCase.execute()
            return response.status(200).send({
                positions
            })
        } catch (error:any) {
            return response.status(500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }
    }
}