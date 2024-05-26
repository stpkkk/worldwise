import { City } from '../types'
import { flagemojiToPNG } from '../utils'
import styles from './CityItem.module.css'

type CityItemProps = {
	city: City
}

const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))

function CityItem({ city }: CityItemProps) {
	const { cityName, emoji, date } = city

	return (
		<li className={styles.CityItem}>
			<span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>({formatDate(date)})</time>
			<button className={styles.deleteBtn}>&times;</button>
		</li>
	)
}

export default CityItem
