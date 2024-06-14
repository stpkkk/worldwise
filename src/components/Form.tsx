import { ChangeEvent, useEffect, useState } from 'react'
import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'
import { useUrlPosition } from '../hooks'
import Spinner from './Spinner'
import { flagEmojiToPNG } from '../utils'
import Message from './Message'

export function convertToEmoji(countryCode: string) {
	if (!countryCode) return ''
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt(0))
	return String.fromCodePoint(...codePoints)
}

function Form() {
	const [mapLat, mapLng] = useUrlPosition()
	const [cityName, setCityName] = useState('')
	const [country, setCountry] = useState('')
	const [emoji, setEmoji] = useState('')
	const [date, setDate] = useState(new Date())
	const [notes, setNotes] = useState('')
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
	const [geocodingError, setGeocodingError] = useState('')

	const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?'

	function handleChangeDate(e: ChangeEvent<HTMLInputElement>): void {
		setDate(new Date(e.target.value))
	}

	useEffect(() => {
		async function fetchCityData() {
			try {
				setIsLoadingGeocoding(true)
				setGeocodingError('')

				const res = await fetch(
					`${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
				)

				if (!res.ok) throw new Error('Problem to fetch res of City Data')

				const data = await res.json()

				if (!data.countryCode)
					throw new Error(
						'That doesn`t seem to be a city. Click somewhere else! 😉'
					)

				setCityName(data.city || data.locality || '')
				setCountry(data.countryName)
				setEmoji(convertToEmoji(data.countryCode))
			} catch (error) {
				console.error((error as Error).message)
				setGeocodingError((error as Error).message)
			} finally {
				setIsLoadingGeocoding(false)
			}
		}

		if (mapLat && mapLng) {
			fetchCityData()
		}
	}, [mapLat, mapLng])

	if (isLoadingGeocoding) return <Spinner />
	if (geocodingError) return <Message message={geocodingError} />

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji && flagEmojiToPNG(emoji)}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<input
					id='date'
					onChange={handleChangeDate}
					value={date.toISOString().split('T')[0]}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button onClick={() => {}} type='primary'>
					Add
				</Button>
				<BackButton />
			</div>
		</form>
	)
}

export default Form
