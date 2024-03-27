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

// Phonebook Backend Step1
// Get all phonebook entries
app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Phonebook backend Step2
// Return page with count of phonebook entires and time of request
app.get("/info", (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${(new Date())}</p>`)
    })
    .catch(error => next(error))
})

// Phonebook backend step3
// Get single phonebook entry
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then((personInfo) => {
    personInfo ? response.json(personInfo) : response.status(404).end()
  })
  .catch(error => next(error))
})

// Phonebook backend step4
// Delete phonebook entry by id
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Update phonebook entry by id
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// Phonebook backend step5
// Add phonebook entry
app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformated id" })
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: "Name or Number missing" })
  }

  next(error)
}

app.use(errorHandler)
