import styles from './CountryItem.module.css'
import FlagImageFromEmoji from './FlagImageFromEmoji'

type CountryProps = {
	country: {
		country: string
		emoji: string
	}
}

function CountryItem({ country }: CountryProps) {
	return (
		<li className={styles.countryItem}>
			<span>
				<FlagImageFromEmoji flag={country.emoji} />
			</span>
			<span>{country.country}</span>
		</li>
	)
}

export default CountryItem
