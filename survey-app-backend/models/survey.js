const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isOther: {
        type: Boolean,
        default: false
    }
})

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [optionSchema]
})

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema]
})

const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey