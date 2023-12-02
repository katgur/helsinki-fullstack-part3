const personsRouter = require('express').Router()
const Person = require('../model/person')

personsRouter.get('/', async (request, response) => {
  const result = await Person.find({ author: request.user.id })
  response.json(result)
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if (result) {
        if (person.author.toString() !== request.user.id.toString()) {
          response.json(result)
        } else {
          response.status(403).end()
        }
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
    author: request.user.id,
  })

  person.save()
    .then(() => {
      response.status(201).json(person)
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', async (request, response, next) => {
  const newPerson = {
    name: request.body.name,
    number: request.body.number,
  }

  const person = await Person.findById(request.params.id)
  if (!person) {
    response.status(404).end()
  }
  if (person.author.toString() !== request.user.id.toString()) {
    response.status(403).end()
  }
  const result = await Person.findByIdAndUpdate(request.params.id, newPerson, { new: true, runValidators: true, context: 'query' })
  response.json(result)
})

personsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const person = await Person.findById(id)
  if (!person) {
    response.status(404).end()
  }
  if (person.author.toString() !== request.user.id.toString()) {
    response.status(403).end()
  }
  await Person.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = personsRouter