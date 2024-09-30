const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    hasOther: {
        type: Boolean,
        default: false
    },
    options: [String],
    responses: [{}],
    surveyId: String
})

questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
