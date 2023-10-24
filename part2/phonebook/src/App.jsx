import { useState, useEffect } from "react"
import personServices from "./services/persons"
import Notification from "./components/Notification"

const Filter = ({ value, onChange }) => {
    return (
        <div>
            filer shown with <input value={value} onChange={onChange}></input>
        </div>
    )
}

const Person = ({ name, number, handlePersonDelete }) => {
    return (
        <li>
            {name} {number}
            <button onClick={handlePersonDelete}>Delete</button>
        </li>
    )
}

const Persons = ({ persons, handlePersonDelete }) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    handlePersonDelete={() => handlePersonDelete(person.id)}
                />
            ))}
        </ul>
    )
}

const PersonForm = ({ onSubmit, nameValue, nameChange, numberValue, NumberChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={nameValue} onChange={nameChange} />
            </div>
            <div>
                number: <input value={numberValue} onChange={NumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchFilter, setSearchFilter] = useState("")
    const [notificationMessage, setNotificationMessage] = useState({ message: null, type: null})

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

                personServices.update(personID, personObject).then((returnedPerson) => {
                    setPersons(persons.map((person) => (person.id !== personID ? person : returnedPerson)))
                    setNewName("")
                    setNewNumber("")

                    showNotification(`Updated ${returnedPerson.name} number to ${returnedPerson.number}`)
                })
            }
        } else {
            personServices.create(personObject).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
                showNotification(`Added ${returnedPerson.name}`)
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
            personServices.remove(id).then(() => {
                setPersons(persons.filter((person) => person.id !== id))

                showNotification(`Deleted ${personObject.name}`, "success")
            })
        }
    }

    const showNotification = (message, type) => {
        setNotificationMessage({ message: message, type: type})

        setTimeout(() => {
            setNotificationMessage({message: null, type: null})
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
