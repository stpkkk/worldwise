import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from 'react-leaflet'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import styles from './Map.module.css'
import { useCities } from '../context'
import { flagEmojiToPNG } from '../utils'
import { useGeolocation, useUrlPosition } from '../hooks'
import Button from './Button'

function Map() {
	const { cities } = useCities()
	const [mapLat, mapLng] = useUrlPosition()
	const [mapPosition, setMapPosition] = useState<LatLngExpression>([
		61.7894508, 34.3244285,
	])
	const {
		isLoading: isLoadingPosition,
		getPosition,
		position: geolocationPosition,
	} = useGeolocation()

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)])
	}, [mapLat, mapLng])

	useEffect(() => {
		if (geolocationPosition)
			setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
	}, [geolocationPosition])

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={8}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map(city => (
					<Marker position={city.position} key={city.id}>
						<Popup className={styles.popup}>
							<span>{city.emoji && flagEmojiToPNG(city.emoji)}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

interface ChangeCenterProps {
	position: LatLngExpression
}

function ChangeCenter({ position }: ChangeCenterProps) {
	const map = useMap()
	map.setView(position)
	return null
}

function DetectClick() {
	const navigate = useNavigate()

	useMapEvents({
		click: (e: LeafletMouseEvent) =>
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	})
	return null
}

export default Map
