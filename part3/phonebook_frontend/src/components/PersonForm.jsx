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

export default PersonForm