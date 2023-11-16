/**
 * CountrySearch Component
 *
 * This component provides an input field for searching countries.
 *
 * @param {function} onChange - A function to handle changes in the input field.
 *
 */

const CountrySearch = ({ onChange }) => {
    return (
        <div>
            find countries <input onChange={onChange} />
        </div>
    )
}

export default CountrySearch
