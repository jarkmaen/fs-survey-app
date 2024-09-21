const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }
    const userForToken = {
        id: user._id,
        username: user.username
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({ name: user.name, token, username: user.username })
})

module.exports = router
