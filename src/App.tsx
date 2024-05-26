import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
	AppLayout,
	Homepage,
	Login,
	PageNotFound,
	Pricing,
	Product,
} from './pages'
import { CityList, CountryList } from './components'
import { City } from './types'

const BASE_URL = 'http://localhost:8000'

function App() {
	const [cities, setCities] = useState<City[]>([])
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
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='product' element={<Product />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='cities'
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='countries'
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
