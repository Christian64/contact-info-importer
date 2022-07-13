const { Router } = require('express')
const routes = Router()
const { singIn, register } = require('../controllers/users')

routes.post('/', register)
routes.post('/login', singIn)

module.exports = routes