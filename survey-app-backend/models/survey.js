const mongoose = require('mongoose')
const questionSchema = require('./question').schema

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    closed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

surveySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey
