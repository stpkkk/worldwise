import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import {
// 	AppLayout,
// 	Homepage,
// 	Login,
// 	PageNotFound,
// 	Pricing,
// 	Product,
// 	ProtectedRoute,
// } from './pages'
import {
	City,
	CityList,
	CountryList,
	Form,
	SpinnerFullPage,
} from './components'
import { AuthProvider, CitiesProvider } from './context'

const Homepage = lazy(() => import('./pages/Homepage'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'))

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='pricing' element={<Pricing />} />
							<Route path='product' element={<Product />} />
							<Route path='login' element={<Login />} />

							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route index element={<Navigate replace to='cities' />} />
								<Route path='cities' element={<CityList />} />
								<Route path='cities/:id' element={<City />} />
								<Route path='countries' element={<CountryList />} />
								<Route path='form' element={<Form />} />
							</Route>
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	)
}

export default App
