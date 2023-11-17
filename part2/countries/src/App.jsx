import { useState, useEffect } from "react"
import countryServices from "./services/countries"
import weatherServices from "./services/weather"
import CountrySearch from "./components/CountrySearch"
import CountryList from "./components/CountryList"
import CountryDisplay from "./components/CountryDisplay"

function App() {
    const [allCountries, setAllCountries] = useState([])
    const [searchCountries, setSearchCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState({ country: null, weather: null })

    useEffect(() => {
        countryServices.getAllCountries().then((countries) => {
            setAllCountries(countries.map((country) => country.name.common.toLowerCase()))
        })
    }, [])

    const handleSearchChange = (event) => {
        // Local variable for countries that match input field text
        const searchCountriesFound = allCountries.filter((country) => country.includes(event.target.value.toLowerCase()))

        // Update the state of searchCountries
        setSearchCountries(searchCountriesFound)

        // Display or Disable activeCountry based on length of countries that match
        searchCountriesFound.length === 1 ? displayCountry(searchCountriesFound[0]) : setActiveCountry({ country: null, weather: null })
    }

    /**
     * Sets activeCountry.country to country object of getCountry and activeCountry.weather to object from getWeather
     *
     * @param {string} country - The name of the country to add to activeCountry
     */
    const displayCountry = (country) => {
        // Check if current activeCountry is the same; if true return null
        if (activeCountry.country?.name.common.toLowerCase() === country) {
            return null
        }

        // Fetch the country information and set it as the active country
        countryServices.getCountry(country).then((countryObject) => {
            weatherServices.getWeather(countryObject.latlng[0], countryObject.latlng[1]).then((weather) => {
                setActiveCountry({
                    country: countryObject,
                    weather: weather,
                })
            })
        })
    }

    /**
     * Toggles the value of activeCountry based on the provided country name.
     *
     * @param {string} country - The name of the country to add to or remove from activeCountry.
     */
    const toggleActiveCountry = (country) =>
        activeCountry.country?.name.common.toLowerCase() == country ? setActiveCountry({ country: null, weather: null }) : displayCountry(country)

    return (
        <div>
            <CountrySearch onChange={handleSearchChange} />
            <CountryList
                countryArray={searchCountries}
                toggleCountry={toggleActiveCountry}
                activeCountryName={activeCountry.country?.name.common.toLowerCase()}
            />
            <CountryDisplay {...activeCountry} />
        </div>
    )
}

export default App
