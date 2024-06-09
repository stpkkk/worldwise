import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { useState } from 'react'

function Map() {
	const [searchParams] = useSearchParams()
	const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0])
	const lat = parseFloat(searchParams.get('lat') ?? '0')
	const lng = parseFloat(searchParams.get('lng') ?? '0')
	const navigate = useNavigate()

	function handleClick() {
		navigate('form')
	}

	return (
		<div className={styles.mapContainer} onClick={handleClick}>
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				<Marker position={mapPosition}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default Map
