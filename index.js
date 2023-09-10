const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

const PORT = 3001

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

function id() {
    return Math.floor(Math.random() * 1000000)
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)
    if (person) {
        response.json(person)
    } else {
        response
            .status(404)
            .json({ error: `No person with id ${id} found` })
    }
})

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

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        id: id(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${persons.length} people`
    const timestamp = new Date()
    response.send(
        `<div>${info}<br/>${timestamp}</div>`
    )
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})