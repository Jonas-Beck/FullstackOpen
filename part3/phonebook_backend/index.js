require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()


// Morgan middleware step 8
// Tiny format with req body 
app.use(morgan(function(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
    JSON.stringify(req.body)
  ].join(" ")
}))

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

let phonebookData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

// Method for generating a new unique id
const generateId = () => {
  const maxId = phonebookData.length > 0 ? Math.max(...phonebookData.map((n) => n.id)) : 0

  return maxId + 1
}

// Phonebook Backend Step1
// Get all phonebook entries
app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Phonebook backend Step2
// Return page with count of phonebook entires and time of request
app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${phonebookData.length} people</p><p>${(new Date())}</p>`)
})

// Phonebook backend step3
// Get single phonebook entry
app.get("/api/persons/:id", (request, respond) => {
  const id = Number(request.params.id)
  const PhoneInfo = phonebookData.find((data) => data.id === id)

  PhoneInfo ? respond.json(PhoneInfo) : respond.status(404).end()
})

// Phonebook backend step4
// Delete phonebook entry by id
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

// Phonebook backend step5
// Add phonebook entry
app.post("/api/persons", (request, response) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  const newEntry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

  // TODO Add in later part
  //
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "Name or Number missing",
  //   })
  // }
  //
  // if (phonebookData.some(entry => entry.name === body.name)) {
  //   return response.status(400).json({
  //     error: "Entry with that name already exists",
  //   })
  // }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
