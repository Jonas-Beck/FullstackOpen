import { useState, useEffect } from "react"
import countryServices from "./services/countries"
import CountrySearch from "./components/CountrySearch"
import CountryList from "./components/CountryList"
import CountryDisplay from "./components/CountryDisplay"

function App() {
    const [allCountries, setAllCountries] = useState([])
    const [searchCountries, setSearchCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState(null)

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
        searchCountriesFound.length === 1 ? displayCountry(searchCountriesFound[0]) : setActiveCountry(null)
    }

    /**
     * Sets activeCountry to country object of parameter
     *
     * @param {string} country - The name of the country to add to activeCountry
     */
    const displayCountry = (country) => {
        // Fetch the country information and set it as the active country
        countryServices.getCountry(country).then((countryObject) => {
            setActiveCountry(countryObject)
        })
    }

    /**
     * Toggles the value of activeCountry based on the provided country name.
     *
     * @param {string} country - The name of the country to add to or remove from activeCountry.
     */
    const toggleActiveCountry = (country) =>
        activeCountry?.name.common.toLowerCase() == country ? setActiveCountry(null) : displayCountry(country)

    return (
        <div>
            <CountrySearch onChange={handleSearchChange} />
            <CountryList
                countryArray={searchCountries}
                toggleCountry={toggleActiveCountry}
                activeCountryName={activeCountry?.name.common.toLowerCase()}
            />
            <CountryDisplay country={activeCountry} />
        </div>
    )
}

export default App
