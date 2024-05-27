import { useParams } from 'react-router-dom'
import styles from './City.module.css'
import { CityType } from '../types'
import { flagemojiToPNG } from '../utils'

type CityProps = {
	cities: CityType[]
}

const formatDate = (date: any) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date))

function City({ cities }: CityProps) {
	const { id } = useParams<{ id: string }>()
	const currentCity = cities.find(city => city.id === id)

	if (!currentCity) {
		return <div>City not found</div>
	}

	const { cityName, emoji, date, notes } = currentCity

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{flagemojiToPNG(emoji)}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target='_blank'
					rel='noreferrer'
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>{/* <ButtonBack /> */}</div>
		</div>
	)
}

export default City
