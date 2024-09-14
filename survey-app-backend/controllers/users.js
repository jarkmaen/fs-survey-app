const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'password missing or too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

module.exports = router