const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.json())

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


app.get('/people', (req, res) => {
    res.json(people)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${people.length} people</p>`)
    res.send(`${express.responseTime()}`)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
console.log('hello')