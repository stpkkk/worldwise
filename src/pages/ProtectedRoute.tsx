import { ReactNode, useEffect } from 'react'
import { useAuth } from '../context'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
	children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) navigate('/')
	}, [isAuthenticated, navigate])

	return isAuthenticated ? children : null
}

export default ProtectedRoute
