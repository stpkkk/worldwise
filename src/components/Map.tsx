import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

function Map() {
	const { cities } = useCities()

	const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0])

	const [searchParams] = useSearchParams()
	const mapLat = searchParams.get('lat')
	const mapLng = searchParams.get('lng')

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)])
	}, [mapLat, mapLng])

	return (
		<div className={styles.mapContainer}>
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map(city => (
					<Marker position={city.position} key={city.id}>
						<Popup className={styles.popup}>
							<span>{flagEmojiToPNG(city.emoji)}</span>
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
