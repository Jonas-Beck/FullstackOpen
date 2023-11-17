/**
 * CountryDisplay Component
 *
 * This component displays detailed information about a country and weather information about the country's capital
 *
 * @param {Object|null} country - The country object to display information about.
 * @param {Object|null} weather - the weather object to display information about
 */

const CountryDisplay = ({ country, weather }) => {
    if (country == null && weather == null) {
        return null
    }

    return (
        <div>
            {/* Country Data */}

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
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            {/* Country Flag Image */}
            <img src={country.flags.png} alt={country.flags.alt} />
            
            {/* Weather Data*/}

            {/* Location for the weather forecast*/}
            <h2>Weather in {country.capital}</h2>
            {/* Temperature in Celcius*/}
            <p>temperature {weather.main.temp} Celcius</p>
            {/* Image of weather with alt description*/}
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.description} />
            {/* Wind speed in m/s */}
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default CountryDisplay
