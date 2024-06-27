import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import cities from '../data/cities.json'

const useMockAdapter = () => {
	const mock = new MockAdapter(axios, { delayResponse: 600 })

	// Mocks for getting cities
	mock.onGet('/api/cities').reply(200, cities)

	// Mocks for getting a city by id
	mock.onGet(/\/api\/cities\/\d+/).reply((config: any) => {
		const id = config.url.split('/').pop()
		const city = cities.cities.find(city => city.id === id)
		if (city) {
			return [200, city]
		} else {
			return [404, { message: 'City not found' }]
		}
	})

	// Mocks for deleting a city
	mock.onDelete(/\/api\/cities\/\d+/).reply((config: any) => {
		const id = config.url.split('/').pop()
		const cityIndex = cities.cities.findIndex(city => city.id === id)
		if (cityIndex !== -1) {
			cities.cities.splice(cityIndex, 1)
			return [200, { message: 'City deleted successfully' }]
		} else {
			return [404, { message: 'City not found' }]
		}
	})

	// Mocks for creating a city
	mock.onPost('/api/cities').reply(config => {
		const newCity = JSON.parse(config.data)
		newCity.id = String(cities.cities.length + 1) // Generate a new ID for the city
		cities.cities.push(newCity)
		return [201, newCity]
	})

	return mock
}

export default useMockAdapter
