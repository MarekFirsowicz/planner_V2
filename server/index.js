import express from 'express'
const app = express()
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { verifyToken, verifyAccessGt2, verifyAccessGt3 } from './middleware/verifyToken.js'

import authRoute from './routes/auth.js'
import employeeRoute from './routes/employee.js'
import calendarRoute from './routes/calendar.js'
import contractRoute from './routes/contract.js'
import patternRoute from './routes/pattern.js'


//mongoose.set('strictQuery', true);
dotenv.config()
//app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/auth', authRoute)

app.use(verifyToken)
app.use('/api/calendars', calendarRoute)
app.use('/api/employees', employeeRoute)
app.use('/api/contracts', contractRoute)
app.use('/api/patterns', patternRoute)



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

mongoose.connect('mongodb://127.0.0.1:27017/planner')//  process.env.MONGO_URL
    .then(() => {
        console.log('Connected to database ')
        app.listen(process.env.PORT, () => {
            console.log('Backend is running on port ' + process.env.PORT )
        })
    })
    .catch((err) => {
        console.error(`Error connecting to the database.`);
    })
