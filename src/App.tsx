import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout, Homepage, PageNotFound, Pricing, Product } from './pages'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='app' element={<AppLayout />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
