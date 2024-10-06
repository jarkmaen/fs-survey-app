const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Survey = require('../models/survey')
const User = require('../models/user')

router.delete('/remove', async (request, response) => {
    const { id } = request.body
    if (!id) {
        return response.status(400).json({ error: 'id is missing' })
    }
    const user = await User.findById(id)
    if (!user) {
        return response.status(404).json({ error: 'user not found' })
    }
    await Survey.deleteMany({ user: id })
    await User.findByIdAndDelete(id)
    response.status(204).end()
})

router.get('/', async (request, response) => {
    const users = await User.find({}).populate('surveys', { id: 1, title: 1 })
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
    const userForToken = {
        id: savedUser._id,
        username: savedUser.username
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(201).json({ id: savedUser.id, name: savedUser.name, token, username: savedUser.username })
})

router.put('/update', async (request, response) => {
    const { id, name } = request.body
    if (!id) {
        return response.status(400).json({ error: 'id is missing' })
    }
    if (!name) {
        return response.status(400).json({ error: 'name is missing' })
    }
    const updatedUser = await User.findByIdAndUpdate(id, { name }, { context: 'query', new: true, runValidators: true })
    response.json(updatedUser)
})

module.exports = router
