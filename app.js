const express = require('express')
const cors = require('cors')


const app = express()


const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
// const fileUpload= require('express-fileUpload')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: true }))
// app.use(fileUpload())


const UserRoutes = require('./Routes/UserRoutes')
const PhotographerRoutes = require('./Routes/PhotographerRoutes')
// const errorMiddleware = require('./middlewares/error')


app.use('/api', UserRoutes)
app.use('/api', PhotographerRoutes)


// app.use(errorMiddleware)

module.exports = app

