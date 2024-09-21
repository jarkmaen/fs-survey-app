const Response = require('../models/response')
const router = require('express').Router()
const Survey = require('../models/survey')
const { userExtractor } = require('../utils/middleware')

router.post('/', userExtractor, async (req, res) => {
    const { surveyId, response } = req.body
    const user = req.user
    if (!user) {
        return res.status(401).json({ error: 'operation not permitted' })
    }
    const survey = await Survey.findById(surveyId)
    if (survey.closed) {
        return res.status(403).send({ error: 'survey is closed' })
    }
    const r = new Response({
        surveyId,
        userId: user.id,
        response
    })
    const createdResponse = await r.save()
    res.status(201).json(createdResponse)
})

module.exports = router