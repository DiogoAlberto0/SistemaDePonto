import { Router } from "express";

//controllers
import { createTimeSheetController } from "../useCases/TimeSheet/CreateTimeSheet";
import { setMedicalCertificateController } from "../useCases/TimeSheet/SetMedicalCertificate";
import { updateTimeSheetController } from "../useCases/TimeSheet/UpdateTimeSheet";
import { validateUserController } from "../useCases/User/ValidateUser";
import { getTimeSheetController } from "../useCases/TimeSheet/GetTimeSheet";
import { getMonthsAndYearsController } from "../useCases/TimeSheet/GetMonthsAndYears";


const timeSheetRoutes = Router()

timeSheetRoutes.get('/timeSheet/monthsAndYears',
    (request, response, next) => validateUserController.handle(request, response, next, 1),
    (request, response) => getMonthsAndYearsController.handle(request, response)
)

timeSheetRoutes.get('/timeSheet',
    (request, response, next) => validateUserController.handle(request, response, next, 1),
    (request, response) => getTimeSheetController.handle(request, response)
)

timeSheetRoutes.post('/timeSheet',
    (request, response, next) => validateUserController.handle(request, response, next, 1),
    (request, response) => createTimeSheetController.handle(request, response)
)

timeSheetRoutes.put('/timeSheet/:userId', 
    (request, response, next) => validateUserController.handle(request, response, next, 2),
    (request, response) => updateTimeSheetController.handle(request, response)
)

timeSheetRoutes.put('/timeSheet/medicalCertificate/:userId', 
    (request, response, next) => validateUserController.handle(request, response, next, 2),
    (request, response) => setMedicalCertificateController.handle(request, response)
)

export { timeSheetRoutes }