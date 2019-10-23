const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')
const morganBody = require('morgan-body')

app.use(bodyParser.json())
app.use(morgan('tiny'))

morganBody(app)
let people = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-532523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

const generateID = () => {
    return Math.floor(Math.random() * (1000 - 1) + 1)
}

let date = new Date()
app.get('/people', (req, res) => {
    res.json(people)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${people.length} people</p>
        <p>${date}</p>`)
})

app.get('/people/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = people.find(p => p.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/people/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/people', (req, res) => {
    const body = req.body

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        })
    } else if(people.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: "Name already in phonebook!"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

    people = people.concat(person)

    res.json(person)
})

const port = 3001
app.listen(port)