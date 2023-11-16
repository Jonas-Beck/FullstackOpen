/**
 * Country Component
 *
 * This component represents a country with name and a button
 * that can toggle the display of additional information
 *
 * @param {string} name - the name of the country
 * @param {function} toggleCountry - A function to toggle display of more information
 * @param {bool} active - A bool indicating whether or not the current country is active
 */
const Country = ({ name, toggleCountry, active }) => {
    return (
        <p>
            {name} <button onClick={toggleCountry}>{active ? "hide" : "show"}</button>
        </p>
    )
}

/**
 * CountryList Component
 *
 * This component displays a list of countries based on the provided array.
 * It includes conditional rendering for different scenarios:
 * - If there is only one country, it returns null to empty the input.
 * - If there are too many matches (more than 10), it displays a message to specify another filter.
 * - Otherwise, it maps over the countryArray to render individual Country components.
 *
 * @param {array} CountryArray - An array with all countries to display
 * @param {function} toggleCountry - A function to toggle display of more information
 * @param {string} activeCountryName - A string with the name of the currently activated country
 */
const CountryList = ({ countryArray, toggleCountry, activeCountryName }) => {
    // Return null since only 1 country to empty input
    if (countryArray.length === 1) {
        return null
    }

    // Return to many matches message
    if (countryArray.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    // Display list of countries with .map on countryList
    return (
        <div>
            {countryArray.map((country) => (
                <Country
                    name={country}
                    key={country}
                    toggleCountry={() => toggleCountry(country)}
                    active={activeCountryName === country}
                />
            ))}
        </div>
    )
}

export default CountryList
