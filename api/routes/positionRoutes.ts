import { Router } from "express";

//controllers
import { validateUserController } from "../useCases/User/ValidateUser";
import { updatePositionContoller } from "../useCases/Position/UpdatePosition";
import { getAllPositionsController } from "../useCases/Position/GetAllPositions";
import { createPositionContoller } from "../useCases/Position/CreatePosition";
import { getPrivillegeLevelController } from "../useCases/Position/GetPrivillegeLevel";


const positionRoutes = Router()

positionRoutes.get('/position',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => getAllPositionsController.handle(request, response)
)

positionRoutes.get('/position/privillegeLevel',
    (request, response, next) => validateUserController.handle(request, response, next, 0),
    (request, response) => getPrivillegeLevelController.handle(request, response)
)

positionRoutes.post('/position',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => createPositionContoller.handle(request, response)
)

positionRoutes.put('/position/:id',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => updatePositionContoller.handle(request, response)
)

export { positionRoutes }