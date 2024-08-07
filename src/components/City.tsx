import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './City.module.css'
import { useCities } from '../context/CitiesContext'
import { CityType } from '../types'
import Spinner from './Spinner'
import BackButton from './BackButton'
import FlagImageFromEmoji from './FlagImageFromEmoji'

const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date))

function City() {
	const { id } = useParams()
	const { getCity, currentCity, isLoading } = useCities()

	useEffect(() => {
		if (id) getCity(id)
	}, [id, getCity])

	const { cityName, emoji, date, notes } = currentCity as CityType

	if (isLoading) return <Spinner />

	if (!currentCity) {
		return <div>City not found</div>
	}

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji && <FlagImageFromEmoji flag={emoji} />}</span> {cityName}
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

			<div>
				<BackButton />
			</div>
		</div>
	)
}

export default City
