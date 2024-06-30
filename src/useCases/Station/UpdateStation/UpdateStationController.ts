import { Request, Response } from "express";
import { UpdateStationUseCase } from "./UpdateStationUseCase";



export class UpdateStationController {

    constructor(
        private updateStationUseCase: UpdateStationUseCase
    ) { }


    async handle(request: Request, response: Response) {

        const { name, latitude, longitude, cnpj } = request.body

        const stationId = request.params.stationId as string

        if (!stationId || !name || !latitude || !longitude || !cnpj) return response.status(400).send({
            message: 'Informe o id, nome, latitude, longitude e CNPJ do posto'
        })

        if(isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) return response.status(400).send({
            message: 'coordenadas inválidas'
        })

        try {
            await this.updateStationUseCase.execute({
                id: stationId,
                name,
                cnpj,
                coord: {
                    latitude,
                    longitude
                }
            })

            return response.status(201).send({
                message: 'Posto atualizado com sucesso'
            })
        } catch (error: any) {
            return response.status(500).send({
                message: error.message || 'Unexpecter error'
            })
        }
    }
}