import { Router } from "express";

//controllers
import { createUserController } from "../useCases/User/CreateUser";
import { signinUserController } from "../useCases/User/SigninUser";
import { validateUserController } from "../useCases/User/ValidateUser";
import { getAllUserController } from "../useCases/User/GetAllUsers";
import { updatePhoneAndPassController } from "../useCases/User/UpdatePhoneAndPass";
import { getUserByIdController } from "../useCases/User/GetUserById";
import { updateUserController } from "../useCases/User/UpdateUser";



const userRoutes = Router()

userRoutes.get('/users', 
    (request, response, next) => validateUserController.handle(request, response, next, 2),
    (request, response) => getAllUserController.handle(request, response)
)

userRoutes.get('/user', 
    (request, response, next) => validateUserController.handle(request, response, next, 2),
    (request, response) => getUserByIdController.handle(request, response)
)

userRoutes.put('/users/:userId', 
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => updateUserController.handle(request, response)
)

userRoutes.put('/users', 
    (request, response, next) => validateUserController.handle(request, response, next, 1),
    (request, response) => updatePhoneAndPassController.handle(request, response)
)

userRoutes.post('/users',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => createUserController.handle(request, response)
)
userRoutes.post('/signin', (request, response) => signinUserController.handle(request, response))



export { userRoutes }