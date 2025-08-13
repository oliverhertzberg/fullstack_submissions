const express = require('express')
const app = express()

app.use(express.json())

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


app.get('/', (requests, response) => {
    response.send('<p>go to <b>http://localhost:3001/info</b> for more info!</p>')
})

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

const generateID = (() => persons.length > 0 ? String(Math.floor(Math.random() * 100000000)) : 0
)
app.post('/api/persons', (request, response) => {

    console.log('request body in post = ', request.body)
    if (!request.body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    console.log('headers: ',request.headers)
    const person = request.body
    console.log("person in post = ", person)
    person.id = generateID()
    persons = persons.concat(person)
    console.log('persons: ', persons)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(x => x.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})