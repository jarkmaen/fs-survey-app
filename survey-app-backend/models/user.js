const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 2,
        required: true
    },
    username: {
        type: String,
        maxlength: 32,
        minlength: 3,
        required: true,
        unique: true
    },
    passwordHash: String,
    surveys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Survey'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
