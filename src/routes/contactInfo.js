const { Router } = require('express')
const routes = Router()

const { createContact, getContacts } = require('../controllers/contactInfo')

const path = require('path')
const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '../../temp') })

const { isAuthenticated } = require('../utils/auth')

routes.use(isAuthenticated)
routes.post('/', upload.single('csv'), createContact)
routes.get('/', getContacts)

module.exports = routes