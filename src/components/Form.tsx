import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'

import { useCities } from '../context'
import { useUrlPosition } from '../hooks'
import Button from './Button'
import BackButton from './BackButton'
import Spinner from './Spinner'
import Message from './Message'
import styles from './Form.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import FlagImageFromEmoji from './FlagImageFromEmoji'

export function convertToEmoji(countryCode: string) {
	if (!countryCode) return ''
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt(0))
	return String.fromCodePoint(...codePoints)
}

function Form() {
	const { createCity, isLoading } = useCities()
	const [mapLat, mapLng] = useUrlPosition()
	const navigate = useNavigate()

	const [cityName, setCityName] = useState('')
	const [country, setCountry] = useState('')
	const [emoji, setEmoji] = useState('')
	const [date, setDate] = useState<Date | null>(new Date())
	const [notes, setNotes] = useState('')
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
	const [geocodingError, setGeocodingError] = useState('')

	const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?'

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!cityName || !date || !mapLat || !mapLng) return

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: {
				lat: Number(mapLat),
				lng: Number(mapLng),
			},
			id: '',
		}

		await createCity(newCity)

		navigate('../cities')
	}

	useEffect(() => {
		if (!mapLat && !mapLng) return

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

	if (!mapLat && !mapLng)
		return <Message message='Start by clicking somewhere on the map' />
	if (isLoadingGeocoding) return <Spinner />
	if (geocodingError) return <Message message={geocodingError} />

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ''}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>
					{emoji && <FlagImageFromEmoji flag={emoji} />}
				</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<DatePicker
					id='date'
					selected={date}
					onChange={date => setDate(date)}
					dateFormat='dd/MM/yyyy'
					popperPlacement='bottom-start'
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
				<Button type='primary'>Add</Button>
				<BackButton />
			</div>
		</form>
	)
}

export default Form
