require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./model/person')

const app = express()

// middleware
morgan.token('body', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// routes
app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
        mongoose.connection.close()
    })
})

// app.get('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     const person = persons.find(person => person.id == id)
//     if (person) {
//         response.json(person)
//     } else {
//         response
//             .status(404)
//             .json({ error: `No person with id ${id} found` })
//     }
// })

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({ error: 'body missing' })
    }

    if (!body.name) {
        return response.status(400).json({ error: 'name missing' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number missing' })
    }

    const name = body.number
    const number = body.number

    const person = new Person({
        name: name,
        number: number,
    })

    person.save()
        .then(result => {
            response.status(201).json(person)
        })
        .catch(error => {
            console.log('error saving person: ', error.message)
            response.status(500).end()
        })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({ error: 'body missing' })
    }

    if (!body.name) {
        return response.status(400).json({ error: 'name missing' })
    }

    if (!body.number) {
        return response.status(400).json({ error: 'number missing' })
    }
    
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log('error updating person: ', error.message)
            response.status(500).end()
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log('error deleting person: ', error.message)
            response.status(500).end()
        })
})

// app.get('/info', (request, response) => {
//     const info = `Phonebook has info for ${persons.length} people`
//     const timestamp = new Date()
//     response.send(
//         `<div>${info}<br/>${timestamp}</div>`
//     )
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})