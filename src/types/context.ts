import { CityType } from './city'

export type CitiesContextType = {
	cities: CityType[]
	isLoading: boolean
	currentCity: CityType | {}
	getCity: (id?: string) => Promise<void>
}
