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

export default Persons