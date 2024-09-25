import 'dotenv/config'

import express from 'express'

//routes
import { userRoutes } from './routes/userRoutes'
import { stationRoutes } from './routes/stationRoutes'
import { positionRoutes } from './routes/positionRoutes'
import { timeSheetRoutes } from './routes/timeSheetRoutes'

const port = 4000
const app = express()

app.use(express.json())


app.get("/", (req, res) => res.send("Express on Vercel"));

// app.use(stationRoutes)
// app.use(positionRoutes)
// app.use(timeSheetRoutes)
// app.use(userRoutes)


app.listen(port, () => {
    console.log(`Executando na porta: ${port}`)
})

export default app