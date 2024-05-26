import { flagemojiToPNG } from '../utils'
import styles from './CountryItem.module.css'

type CountryProps = {
	country: {
		country: string
		emoji: string
	}
}

function CountryItem({ country }: CountryProps) {
	return (
		<li className={styles.countryItem}>
			<span>{flagemojiToPNG(country.emoji)}</span>
			<span>{country.country}</span>
		</li>
	)
}

export default CountryItem
