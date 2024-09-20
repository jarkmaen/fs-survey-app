const Response = require('../models/response')
const router = require('express').Router()
const { userExtractor } = require('../utils/middleware')

router.post('/', userExtractor, async (req, res) => {
    const { surveyId, response } = req.body
    const user = req.user
    if (!user) {
        return res.status(401).json({ error: 'operation not permitted' })
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