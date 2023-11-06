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
        setSearchCountries(allCountries.filter((country) => country.includes(event.target.value.toLowerCase())))

        // Not working as intended
        searchCountries.length == 1 ? displayCountry() : setActiveCountry(null)
    }

    const displayCountry = () => {
        countryServices.getCountry(searchCountries[0]).then((country) => {
            setActiveCountry(country)
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
