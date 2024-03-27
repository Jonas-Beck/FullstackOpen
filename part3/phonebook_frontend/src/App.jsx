import { useState, useEffect } from "react"
import personServices from "./services/persons"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState({ message: null, type: null })

  const hook = () => {
    personServices.getAll().then((initalPersons) => {
      setPersons(initalPersons)
    })
  }
  useEffect(hook, [])

  const personsToShow =
    searchFilter.length == 0 ? persons : persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personID = persons.find((person) => person.name == personObject.name).id

        personServices
          .update(personID, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map((person) => (person.id !== personID ? person : returnedPerson)))
            setNewName("")
            setNewNumber("")

            showNotification(`Updated ${returnedPerson.name} number to ${returnedPerson.number}`)
          })
          .catch(() => {
            showNotification(`${personObject.name} was already removed from server`, "error")

            setPersons(persons.filter((person) => person.id !== personID))
            setNewName("")
            setNewNumber("")
          })
      }
    } else {
      personServices.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          showNotification(`Added ${returnedPerson.name}`)
        })
        .catch((error) => {
          showNotification(error.response.data.error, "error")
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  const handlePersonDelete = (id) => {
    const personObject = persons.find((person) => person.id === id)

    if (window.confirm(`Delete ${personObject.name} ?`)) {
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))

          showNotification(`Deleted ${personObject.name}`, "success")
        })
        .catch(() => {
          showNotification(`${personObject.name} was already removed from server`, "error")

          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  const showNotification = (message, type) => {
    setNotificationMessage({ message: message, type: type })

    setTimeout(() => {
      setNotificationMessage({ message: null, type: null })
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
      <Filter value={searchFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameChange={handlePersonChange}
        numberValue={newNumber}
        NumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App
