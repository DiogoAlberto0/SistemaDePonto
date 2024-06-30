import { Request, Response } from "express";
import { GetAllStationsUseCase } from "./GetAllStationsUseCase";



export class GetAllStationsController {

    constructor(
        private getAllStationsUseCase: GetAllStationsUseCase
    ) {}

    async handle(request: Request, response: Response) {

        try {
            const stations = await this.getAllStationsUseCase.execute()
            
            return response.status(200).send({
                stations
            })
        } catch (error: any) {
            return response.status(500).send({
                message: error.message || 'Ocorreu um erro inesperado'
            })
        }
    }
}