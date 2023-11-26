const express = require("express")
const app = express()

const phonebookData = [
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
    response.json(phonebookData)
})

// Phonebook backend Step2
// Return page with count of phonebook entires and time of request 
app.get("/info", (request, respone) => {
    respone.send(`<p>Phonebook has info for ${phonebookData.length} people</p><p>${Date = new Date()}</p>`)
})

// Phonebook backend step3
// Get single phonebook entry
app.get("/api/persons/:id", (request, respond) => {
    const id = Number(request.params.id)
    const PhoneInfo = phonebookData.find(data => data.id === id)

    PhoneInfo ? respond.json(PhoneInfo) : respond.status(404).end()
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
