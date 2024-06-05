import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { CitiesContextType, CityType } from '../types'

const BASE_URL = 'http://localhost:8000'
const CitiesContext = createContext<CitiesContextType | undefined>(undefined)

interface CitiesProviderProps {
	children: ReactNode
}

function CitiesProvider({ children }: CitiesProviderProps) {
	const [cities, setCities] = useState<CityType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	async function fetchCities() {
		try {
			setIsLoading(true)
			const res = await fetch(`${BASE_URL}/cities`)
			const data = await res.json()
			setCities(data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchCities()
	}, [])

	return (
		<CitiesContext.Provider value={{ cities, isLoading }}>
			{children}
		</CitiesContext.Provider>
	)
}

function useCities() {
	const context = useContext(CitiesContext)
	if (context === undefined)
		throw new Error('CitiesContext was used outside of the CitiesProvider')
	return context
}

export { CitiesProvider, useCities }