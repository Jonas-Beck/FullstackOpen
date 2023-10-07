import { useState } from "react"

const Filter = ({ value, onChange }) => {
    return (
        <div>
            filer shown with <input value={value} onChange={onChange}></input>
        </div>
    )
}

const Person = ({ name, number }) => {
    return (
        <li>
            {name} {number}
        </li>
    )
}

const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person key={person.id} name={person.name} number={person.number} />
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
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [searchFilter, setSearchFilter] = useState("")

    const personsToShow =
        searchFilter.length == 0 ? persons : persons.filter((person) => person.name.toLowerCase().includes(searchFilter.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
            setNewName("")
            setNewNumber("")
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

    return (
        <div>
            <h2>Phonebook</h2>
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
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App
