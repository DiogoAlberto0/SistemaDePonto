import { Router } from "express";

//controllers
import { createUserController } from "../useCases/User/CreateUser";
import { signinUserController } from "../useCases/User/SigninUser";
import { validateUserController } from "../useCases/User/ValidateUser";
import { getAllUserController } from "../useCases/User/GetAllUsers";



const userRoutes = Router()

userRoutes.get('/users', 
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => getAllUserController.handle(request, response)
)
userRoutes.post('/users',
    (request, response, next) => validateUserController.handle(request, response, next, 3),
    (request, response) => createUserController.handle(request, response)
)
userRoutes.post('/signin', (request, response) => signinUserController.handle(request, response))


export { userRoutes }