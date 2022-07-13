require('dotenv').config()
require('./db')

const express = require('express')
const app = express()
const helmet = require('helmet')

const usersRoutes = require('./routes/users')
const contactInfoRoutes = require('./routes/contactInfo')
const filesRoutes = require('./routes/files')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())

// Routes
app.use('/users', usersRoutes)
app.use('/contactInfo', contactInfoRoutes)
app.use('/files', filesRoutes)

const serverPort = process.env.PORT || 3000
app.listen(serverPort, () => console.log(`Everthing is running in the port: ${serverPort}`))