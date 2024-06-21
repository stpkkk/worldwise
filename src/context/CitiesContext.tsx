import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react'
import { CitiesContextType, CityType } from '../types'

type CitiesProviderProps = {
	children: ReactNode
}

type CitiesState = {
	cities: CityType[]
	currentCity: CityType | {}
	isLoading: boolean
	error: string
}

export type CitiesActions =
	| { type: 'cities/loaded'; payload: CityType[] }
	| { type: 'city/loaded'; payload: CityType }
	| { type: 'city/created'; payload: CityType }
	| { type: 'city/deleted'; payload?: string }
	| { type: 'loading' }
	| { type: 'rejected'; payload: string }

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext<CitiesContextType | undefined>(undefined)

function reducer(state: CitiesState, action: CitiesActions): CitiesState {
	switch (action.type) {
		case 'loading': {
			return { ...state, isLoading: true }
		}
		case 'cities/loaded': {
			return { ...state, isLoading: false, cities: action.payload }
		}
		case 'city/loaded': {
			return { ...state, isLoading: false, currentCity: action.payload }
		}
		case 'city/created': {
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			}
		}
		case 'city/deleted': {
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(city => city.id !== action.payload),
				currentCity: {},
			}
		}
		case 'rejected': {
			return { ...state, error: action.payload }
		}
		default:
			throw new Error('Unknown city action')
	}
}

function CitiesProvider({ children }: CitiesProviderProps) {
	const initialState: CitiesState = {
		cities: [],
		currentCity: {},
		isLoading: false,
		error: '',
	}

	const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
		reducer,
		initialState
	)

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: 'loading' })
			try {
				const res = await fetch(`${BASE_URL}/cities`)

				if (!res.ok) throw new Error('There was an error fetching a cities!')

				const data = await res.json()
				dispatch({ type: 'cities/loaded', payload: data })
			} catch (error) {
				dispatch({ type: 'rejected', payload: (error as Error).message })
			}
		}
		fetchCities()
	}, [])

	async function getCity(id?: string) {
		if ('id' in currentCity && id === currentCity.id) return

		dispatch({ type: 'loading' })
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`)

			if (!res.ok) throw new Error('There was an error to get a city!')

			const data = await res.json()
			dispatch({ type: 'city/loaded', payload: data })
		} catch (error) {
			dispatch({ type: 'rejected', payload: (error as Error).message })
		}
	}

	async function createCity(newCity: CityType) {
		dispatch({ type: 'loading' })
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!res.ok) throw new Error('There was an error creating a city!')

			const data = await res.json()
			dispatch({ type: 'city/created', payload: data })
		} catch (error) {
			dispatch({ type: 'rejected', payload: (error as Error).message })
		}
	}

	async function deleteCity(id?: string) {
		dispatch({ type: 'loading' })
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' })

			if (!res.ok) throw new Error('There was an error deleting a city!')

			dispatch({ type: 'city/deleted', payload: id })
		} catch (error) {
			dispatch({ type: 'rejected', payload: (error as Error).message })
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				getCity,
				currentCity,
				createCity,
				deleteCity,
				error,
			}}
		>
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
