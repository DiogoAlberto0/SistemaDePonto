import { Router } from "express";

import { createStationController } from "../useCases/Station/CreateStation";
import { validateUserController } from "../useCases/User/ValidateUser";
import { getAllStationsController } from "../useCases/Station/GetAllStations";
import { updateStationController } from "../useCases/Station/UpdateStation";



const stationRoutes = Router()

stationRoutes.get('/station',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => getAllStationsController.handle(request, response)
)

stationRoutes.post('/station',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => createStationController.handle(request, response)
)

stationRoutes.put('/station/:stationId',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => updateStationController.handle(request, response)
)


export { stationRoutes }