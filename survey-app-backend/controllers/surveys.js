const Question = require('../models/question')
const router = require('express').Router()
const Survey = require('../models/survey')
const { userExtractor } = require('../utils/middleware')

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
    const { title, description, questions } = request.body
    const surveyQuestions = questions.map(
        (q) =>
            new Question({
                question: q.question,
                options: q.options,
                responses: [],
                surveyId: null
            })
    )
    const survey = new Survey({
        title,
        description,
        questions: surveyQuestions
    })
    const savedSurvey = await survey.save()
    surveyQuestions.forEach((q) => (q.surveyId = survey.id))
    await Promise.all(surveyQuestions.map((q) => q.save()))
    response.status(201).json(savedSurvey)
})

router.post('/:id/responses', userExtractor, async (request, response) => {
    const { id } = request.params
    const survey = await Survey.findById(id)
    if (!survey) {
        return response.status(404).send({ error: 'survey not found' })
    }
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'operation not permitted' })
    }
    const { questions } = request.body
    survey.questions.forEach((question) => {
        const newResponse = questions.find((q) => q.id === question.id)
        question.responses.push(newResponse.response)
    })
    const updatedSurvey = await Survey.findByIdAndUpdate(survey.id, { questions: survey.questions }, { new: true })
    response.status(200).json(updatedSurvey)
})

module.exports = router
