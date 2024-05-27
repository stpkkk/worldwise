import { Link } from 'react-router-dom'
import { CityType } from '../types'
import { flagemojiToPNG } from '../utils'
import styles from './CityItem.module.css'

type CityItemProps = {
	city: CityType
}

const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))

function CityItem({ city }: CityItemProps) {
	const { id, cityName, emoji, date, position } = city

	return (
		<li>
			<Link
				className={styles.CityItem}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	)
}

export default CityItem
