import { Router } from "express";

import { createStationController } from "../useCases/Station/CreateStation";
import { validateUserController } from "../useCases/User/ValidateUser";
import { getAllStationsController } from "../useCases/Station/GetAllStations";



const stationRoutes = Router()

stationRoutes.get('/station',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => getAllStationsController.handle(request, response)
)

stationRoutes.post('/station',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => createStationController.handle(request, response)
)


export { stationRoutes }