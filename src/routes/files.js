const { Router } = require('express')
const routes = Router()
const File = require('../models/files')
const { isAuthenticated } = require('../utils/auth')

routes.use(isAuthenticated)
routes.get('/', async (req, res) => {
    const files = await File.find({ id: req.session.id })
    res.status(200).json(files)
})

module.exports = routes