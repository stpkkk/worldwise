// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { ChangeEvent, useState } from 'react'
import styles from './Form.module.css'
import Button from './Button'
import BackButton from './BackButton'

function Form() {
	const [cityName, setCityName] = useState('')
	const [country, setCountry] = useState('')
	const [date, setDate] = useState(new Date())
	const [notes, setNotes] = useState('')

	function handleChangeDate(e: ChangeEvent<HTMLInputElement>): void {
		setDate(new Date(e.target.value))
	}

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				{/* <span className={styles.flag}>{flagEmojiToPNG(emoji)}</span> */}
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
