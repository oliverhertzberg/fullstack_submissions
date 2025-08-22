const express = require('express')
const morgan = require('morgan')
// const cors = require('cors')

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body) 
})


const app = express()

app.use(express.json())
// with express GET requests if path is found in dist
app.use(express.static('dist'))

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


// app.use(cors())

let persons = 
[
    {
        "id": "1",
        "name": "RAT",
        "number": "444444444"
    },
    {
        "id": "2",
        "name": "DOG",
        "number": "777777777"
    }
]


app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${(new Date().toString())}</p>`
    )
})

app.get('/api/persons', (requests, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log('typeof id = ', typeof(id))
    const person = persons.find((x) => x.id === id)
    console.log('person: ', person)
    
    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.put('/api/persons/:id', (request, response) => {
    const person = request.body

    if (!person?.number) {
        return response.status(400).json({
            error: `number cannot be empty!`
        })
    }
    persons = persons.map((x) => x.id !== request.params.id ? x : person)
    return response.json(person)
})

const generateID = (() => persons.length > 0 ? String(Math.floor(Math.random() * 100000000)) : 0
)
app.post('/api/persons', (request, response) => {

    const person = request.body
    if (!person?.name || !person?.number) {
        return response.status(400).json({
            error: 'content missing, number and name required!'
        })
    }
    if (persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        return response.status(409).json({
            error: 'name already in use! please provide another one.'
        })
    }
    console.log('we are in express post!!!')
    person.id = generateID()
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(x => x.id !== id)

    response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})