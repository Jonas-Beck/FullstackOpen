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

    const handleSearchChange =  (event) => {

        // Local variable for countries that match input field text
        const searchCountriesFound = allCountries.filter((country) => country.includes(event.target.value.toLowerCase()))

        // Update the state of searchCountries
        setSearchCountries(searchCountriesFound)

        // Display or Disable activeCountry based on length of countries that match 
        searchCountriesFound.length === 1 ? displayCountry(searchCountriesFound[0]) : setActiveCountry(null)

    }

    const displayCountry = (country) => {
        countryServices.getCountry(country).then((countryObject) => {
            setActiveCountry(countryObject)
        })
    }

    return (
        <div>
            <CountrySearch onChange={handleSearchChange} />
            <CountryList countryList={searchCountries} />
            <CountryDisplay country={activeCountry} />
        </div>
    )
}

export default App
