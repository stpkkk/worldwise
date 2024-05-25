import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	AppLayout,
	Homepage,
	Login,
	PageNotFound,
	Pricing,
	Product,
} from './pages'
import { CityList } from './components'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='product' element={<Product />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route index element={<CityList />} />
					<Route path='cities' element={<CityList />} />
					<Route path='countries' element={<p>Country list</p>} />
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
