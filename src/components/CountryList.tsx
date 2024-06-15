import { useCities } from '../context/CitiesContext'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

function CountryList() {
	const { isLoading, cities } = useCities()

	const countries = cities.reduce(
		(arr: { country: string; emoji: string }[], city) => {
			if (!arr.some(el => el.country === city.country)) {
				return [...arr, { country: city.country, emoji: city.emoji }]
			}
			return arr
		},
		[]
	)

	if (isLoading) return <Spinner />
	if (!countries.length && !isLoading)
		return (
			<Message message='Add your first city by clicking on a city on the map' />
		)

	return (
		<ul className={styles.countryList}>
			{countries.map((country, i) => (
				<CountryItem key={i} country={country} />
			))}
		</ul>
	)
}

export default CountryList
