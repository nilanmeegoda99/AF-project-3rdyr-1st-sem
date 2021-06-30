import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './src/config/db.js'
import userRoute from './src/routes/userRoutes.js'
import conferenceRoutes from './src/routes/conferenceRoutes.js'
import eventsRoutes from './src/routes/eventsRoutes.js'
import workshopRoutes from './src/routes/workshopRoutes.js'
import researchRoutes from './src/routes/researchRoutes.js'
import notificationRoutes from './src/routes/notificationRoutes.js'
import downloadableRoutes from './src/routes/downloadableRoutes.js'
import bookingRoutes from './src/routes/bookingRoutes.js'
import paymentRoutes from './src/routes/paymentRoutes.js'

import fileUploadController from './src/controllers/fileUploadController.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(bodyParser.json())

//set upload folder
app.use(express.static('/uploads/'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Api is working')
});


//directing api calls to relavent routes
app.use('/api/users', userRoute)
app.use('/api/conferences', conferenceRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/workshops', workshopRoutes)
app.use('/api/researches', researchRoutes)

app.use('/api/notifications', notificationRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/materials', downloadableRoutes)

app.use('/api/files/', fileUploadController)

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
