const CountryDisplay = ({ country }) => {
    if (country == null) {
        return null
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p>
                <b>languages:</b>
            </p>
            <ul>
                {Object.values(country.languages).map((langauge) => (
                    <li key={langauge}>{langauge}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default CountryDisplay
