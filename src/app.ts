import 'dotenv/config'

import express from 'express'

//routes
import { userRoutes } from './routes/userRoutes'
import { stationRoutes } from './routes/stationRoutes'
import { positionRoutes } from './routes/positionRoutes'
import { timeSheetRoutes } from './routes/timeSheetRoutes'

const app = express()

app.use(express.json())


app.use(stationRoutes)
app.use(positionRoutes)
app.use(timeSheetRoutes)
app.use(userRoutes)

export { app }