const Survey = require('../models/survey')
const router = require('express').Router()

router.get('/', async (request, response) => {
    const surveys = await Survey.find({})
    response.json(surveys)
})

router.post('/', async (request, response) => {
    const { title, questions } = request.body

    const survey = new Survey({
        title,
        questions
    })

    const savedSurvey = await survey.save()

    response.status(201).json(savedSurvey)
})

module.exports = router