import { useState } from 'react'
import { Position } from '../types'

export function useGeolocation(defaultPosition = null) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [position, setPosition] = useState<Position | null>(defaultPosition)

	function getPosition() {
		if (!navigator.geolocation)
			return setError('Your browser does not support geolocation')

		setIsLoading(true)
		navigator.geolocation.getCurrentPosition(
			pos => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				})
				setIsLoading(false)
			},
			error => {
				setError(error.message)
				setIsLoading(false)
			}
		)
	}

	return { isLoading, error, getPosition, position }
}
