import { Router } from "express";

//controllers
import { createStationController } from "../useCases/Station/CreateStation";
import { validateUserController } from "../useCases/User/ValidateUser";
import { updatePositionContoller } from "../useCases/Position/UpdatePosition";
import { getAllPositionsController } from "../useCases/Position/GetAllPositions";


const positionRoutes = Router()

positionRoutes.get('/station',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => getAllPositionsController.handle(request, response)
)

positionRoutes.post('/station',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => createStationController.handle(request, response)
)

positionRoutes.put('/position/:id',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => updatePositionContoller.handle(request, response)
)

export { positionRoutes }