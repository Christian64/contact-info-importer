const jwt = require('jsonwebtoken')
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.get('Bearer');
        const payload = await jwt.verify(token, process.env.JWT_SECRECT_KEY)

        if (!payload) res.sendStatus(401)
        delete payload.iat
        delete payload.exp
        req.session = payload

        next()
    } catch (error) {
        console.log({ error })
        res.send(401)
    }
}
module.exports = { isAuthenticated }