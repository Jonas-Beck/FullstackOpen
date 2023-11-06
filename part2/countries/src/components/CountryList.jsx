const Country = ({ name }) => {
    return <p>{name}</p>
}

const CountryList = ({ countryList}) => {
    // Return null since only 1 country to empty input
    if (countryList.length === 1) {
        return null
    }

    // Return to many matches message
    if (countryList.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    // Display list of countries with .map on countryList
    return (
        <div>
            {countryList.map((country) => (
                <Country name={country} key={country} />
            ))}
        </div>
    )
}

export default CountryList
