const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { errorHandler, logger, tokenExtractor, userExtractor, unknownEndpoint } = require('./util/middleware')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const personsRouter = require('./routes/persons')

const app = express()

const url = require('./util/config').MONGODB_URI
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB succesfully')
    })
    .catch((error) => {
        console.log('error while connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(logger)
app.use(tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', authRouter)
app.use('/api/persons', userExtractor, personsRouter)
app.get('/info', (request, response, next) => {
    Person.count({})
        .then(result => {
            const info = `Phonebook has info for ${result} people`
            const timestamp = new Date()
            response.send(
                `<div>${info}<br/>${timestamp}</div>`
            )
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app