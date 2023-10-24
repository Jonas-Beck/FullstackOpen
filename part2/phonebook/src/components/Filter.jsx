const Filter = ({ value, onChange }) => {
    return (
        <div>
            filer shown with <input value={value} onChange={onChange}></input>
        </div>
    )
}

export default Filter