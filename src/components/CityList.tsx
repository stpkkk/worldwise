import { useCities } from '../context/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'

function CityList() {
	const { isLoading, cities } = useCities()

	if (isLoading) return <Spinner />
	if (!cities.length && isLoading)
		return (
			<Message message='Add your first city by clicking on a city on the map' />
		)

	return (
		<ul className={styles.cityList}>
			{cities.map(city => {
				return <CityItem key={city.id} city={city} />
			})}
		</ul>
	)
}

export default CityList
