import { Request, Response } from "express";
import { CreateStationUseCase } from "./CreateStationUseCase";



export class CreateStationController {

    constructor(
        private createStationUseCase: CreateStationUseCase
    ) { }


    async handle(request: Request, respose: Response) {

        const { name, latitude, longitude, cnpj } = request.body

        if (!name || !latitude || !longitude) return respose.status(400).send({
            message: 'Informe o nome a latitude e a longitude do posto'
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

            return respose.status(201).send({
                message: 'Posto criado com sucesso'
            })
        } catch (error: any) {
            return respose.status(500).send({
                message: error.message || 'Unexpecter error'
            })
        }
    }
}