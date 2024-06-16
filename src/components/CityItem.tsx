import { Link } from 'react-router-dom'
import { CityType } from '../types'
import { flagEmojiToPNG } from '../utils'
import styles from './CityItem.module.css'
import { useCities } from '../context'

type CityItemProps = {
	city: CityType
}

const formatDate = (date: Date | string) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))

function CityItem({ city }: CityItemProps) {
	const { currentCity } = useCities()
	const { id, cityName, emoji, date, position } = city

	const isCurrentCity = (
		currentCity: {} | CityType
	): currentCity is CityType => {
		return (currentCity as CityType).id !== undefined
	}

	if (!date || !emoji) return

	return (
		<li>
			<Link
				className={`${styles.CityItem}${
					isCurrentCity(currentCity) && id === currentCity.id
						? ` ${styles['CityItem--active']}`
						: ''
				}`}
				to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
			>
				<span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date) || null})</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	)
}

export default CityItem
