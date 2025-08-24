require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')


const app = express()

// with express GET requests check if path is found in dist
app.use(express.static('dist'))
app.use(express.json())

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.method(req, res) === 'POST' ? (`{"name":${JSON.stringify(req.body.name)},"number":${JSON.stringify(req.body.number)}}`) : ""
    ].join(' ')
  }))

app.get('/info', (request, response) => {
    Person.find({})
        .then((data) => {
            response.send(
                `<p>Phonebook has info for ${data?.length || 0} people</p>
                <p>${(new Date().toString())}</p>`
            )
        })
})

app.get('/api/persons', (requests, response) => {
    Person.find({})
        .then((persons) => {
            console.log('persons in get: ', persons)
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then((foundPerson) => {
            if (foundPerson)
                response.json(foundPerson)
            else
                response.status(404).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = request.body
    Person.findByIdAndUpdate(
        request.params.id,
        { number: `${person.number}`},
        { new: true, runValidators: true, context: 'query' }
        )
        .then((updatedPerson) => {
            if(updatedPerson)
                response.json(updatedPerson)
            else
                response.status(404).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    
    const person = new Person({
        name: request.body.name,
        number: request.body.number,
    })
    person.save().then(() => {
        console.log(`created new person: ${person}`)
        response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(() => response.status(204).end())
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
            return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})