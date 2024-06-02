import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
	const [searchParams] = useSearchParams()
	const lat = searchParams.get('lat')
	const lng = searchParams.get('lng')
	const navigate = useNavigate()

	function handleClick() {
		navigate('form')
	}

	return (
		<div className={styles.mapContainer} onClick={handleClick}>
			<h1>Map</h1>
			<div>
				{lat} {lng}
			</div>
		</div>
	)
}

export default Map
