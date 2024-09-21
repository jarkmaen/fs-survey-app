const Survey = require('../models/survey')
const router = require('express').Router()

router.get('/', async (request, response) => {
    const surveys = await Survey.find({})
    response.json(surveys)
})

router.patch('/:id/close', async (request, response) => {
    const { id } = request.params
    const survey = await Survey.findByIdAndUpdate(id, { closed: true }, { new: true })
    if (!survey) {
        return response.status(404).send({ error: 'survey not found' })
    }
    response.json(survey)
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