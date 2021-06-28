import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './src/config/db.js'
import userRoute from './src/routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send('Api is working')
});

//directing api calls to relavent routes
app.use('/api/users', userRoute)



const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
