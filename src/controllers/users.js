const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, password, email } = req.body
    const passwordHashed = await bcrypt.hash(password, 12)
    await User.create({
        username,
        email,
        password: passwordHashed
    })
    res.sendStatus(200)
}

const singIn = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select(['email', 'password', 'id'])

    if (!user) res.status(401).json({ msg: "User does\'t exist" })
    const hasAccount = await bcrypt.compare(password, user.password)
    if (hasAccount) {
        const token = await jwt.sign(
            { email, id: user.id },
            process.env.JWT_SECRECT_KEY,
            { expiresIn: '24h' }
        )
        res.json({ token })
    }
}

module.exports = {
    register,
    singIn
}