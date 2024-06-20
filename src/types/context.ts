import { CityType } from './city'

export type CitiesContextType = {
	cities: CityType[]
	isLoading: boolean
	currentCity: CityType | {}
	error: string
	getCity: (id?: string) => Promise<void>
	deleteCity: (id?: string) => Promise<void>
	createCity: (newCity: CityType) => Promise<void>
}
