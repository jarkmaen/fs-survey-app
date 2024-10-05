const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

router.post('/', async (request, response) => {
    const { name, username, password } = request.body
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({ error: 'This username is already taken.' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        name,
        username,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = router
