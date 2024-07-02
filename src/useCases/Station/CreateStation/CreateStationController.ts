import { Request, Response } from "express";
import { CreateStationUseCase } from "./CreateStationUseCase";



export class CreateStationController {

    constructor(
        private createStationUseCase: CreateStationUseCase
    ) { }


    async handle(request: Request, response: Response) {

        const { name, latitude, longitude, cnpj } = request.body

        if (!name || !latitude || !longitude || !cnpj) return response.status(400).send({
            message: 'Informe o nome, latitude, longitude e CNPJ do posto'
        })

        if(isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) return response.status(400).send({
            message: 'coordenadas inválidas'
        })

        try {
            await this.createStationUseCase.execute({
                name,
                cnpj,
                coords: {
                    latitude,
                    longitude
                }
            })

            return response.status(201).send({
                message: 'Posto criado com sucesso'
            })
        } catch (error: any) {
            response.status(error.status || 500).send({
                message: error.message || 'Unexpecter error'
            })
        }
    }
}