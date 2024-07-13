import axios from 'axios'
import { useEffect, useState } from 'react'

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null)
	const languages = Object.values(country.languages)

	useEffect(() => {
		const API_KEY = import.meta.env.VITE_SOME_KEY
		const lat = country.capitalInfo.latlng[0]
		const lon = country.capitalInfo.latlng[1]
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
		axios.get(url).then((res) => setWeather(res.data))
	}, [])
	if (!weather) {
		return null
	}
	const icon = weather.weather[0].icon
	const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`

	return (
		<>
			<h1>{country.name.common}</h1>
			<p>capital: {country.capital}</p>
			<p>area: {country.area}</p>
			<h2>languages</h2>
			{languages.map((language) => (
				<li key={language}>{language}</li>
			))}
			<img src={country.flags.png} alt={country.name.common} />
			<h3>Weather in {country.name.common}</h3>
			<p>temperature {weather.main.temp} Celsius</p>
			<p>{weather.weather[0].description}</p>
			<img src={weatherIconUrl} alt='' />
		</>
	)
}

const CountryList = ({ countries, showCountry }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>
	}

	if (countries.length === 1) {
		return <Country country={countries[0]} />
	}

	return (
		<div>
			{countries.map((c) => (
				<p key={c.fifa}>
					{c.name.common}
					<button onClick={() => showCountry(c.name.common)}>show</button>
				</p>
			))}
		</div>
	)
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')
	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((res) => setCountries(res.data))
	}, [])
	const mathcedCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<>
			<div>
				find country
				<input
					type='text'
					value={query}
					onChange={({ target }) => setQuery(target.value)}
				/>
			</div>
			<CountryList countries={mathcedCountries} showCountry={setQuery} />
		</>
	)
}

export default App
