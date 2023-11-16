/**
 * CountryDisplay Component
 *
 * This component displays detailed information about a country.
 *
 * @param {Object|null} country - The country object to display information about.
 */

const CountryDisplay = ({ country }) => {
    if (country == null) {
        return null
    }

    return (
        <div>
            {/* Country name */}
            <h1>{country.name.common}</h1>
            {/* Capital and area information */}
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            {/* Languages information */}
            <p>
                <b>languages:</b>
            </p>
            <ul>
                {/* List of languages using country.languages values */}
                {Object.values(country.languages).map((langauge) => (
                    <li key={langauge}>{langauge}</li>
                ))}
            </ul>
            {/* Country Flag Image */}
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default CountryDisplay
