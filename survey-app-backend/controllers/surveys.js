const Question = require('../models/question')
const router = require('express').Router()
const Survey = require('../models/survey')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
    const surveys = await Survey.find({}).populate('user', { name: 1, username: 1 })
    response.json(surveys)
})

router.delete('/:id', userExtractor, async (request, response) => {
    const { id } = request.params
    const survey = await Survey.findById(id)
    if (!survey) {
        return response.status(404).send({ error: 'survey not found' })
    }
    const user = request.user
    if (!user || survey.user.toString() !== user.id.toString()) {
        return response.status(401).send({ error: 'operation not permitted' })
    }
    await Survey.findByIdAndDelete(id).populate('user', { name: 1, username: 1 })
    response.status(204).end()
})

router.patch('/:id/close', userExtractor, async (request, response) => {
    const { id } = request.params
    const survey = await Survey.findById(id)
    if (!survey) {
        return response.status(404).send({ error: 'survey not found' })
    }
    const user = request.user
    if (!user || survey.user.toString() !== user.id.toString()) {
        return response.status(401).send({ error: 'operation not permitted' })
    }
    survey.closed = true
    const closedSurvey = await survey.save().then((s) => s.populate('user', { name: 1, username: 1 }))
    response.json(closedSurvey)
})

router.post('/', userExtractor, async (request, response) => {
    const { title, description, questions } = request.body
    const surveyQuestions = questions.map(
        (q) =>
            new Question({
                question: q.question,
                type: q.type,
                hasOther: q.hasOther,
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
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'operation not permitted' })
    }
    survey.user = user.id
    let savedSurvey = await survey.save()
    user.surveys = user.surveys.concat(savedSurvey.id)
    await user.save()
    savedSurvey = await Survey.findById(savedSurvey.id).populate('user', { name: 1, username: 1 })
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
    const updatedSurvey = await Survey.findByIdAndUpdate(
        survey.id,
        { questions: survey.questions },
        { new: true }
    ).populate('user', { name: 1, username: 1 })
    response.status(200).json(updatedSurvey)
})

module.exports = router
