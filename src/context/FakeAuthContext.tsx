import { ReactNode, createContext, useContext, useReducer } from 'react'
import { UserType } from '../types'

type AuthProviderProps = {
	children: ReactNode
}

type AuthContextType = {
	user: UserType | null
	isAuthenticated: boolean
	login: (email: string, password: string) => void
	logout: () => void
}

type AuthState = {
	user: UserType | null
	isAuthenticated: boolean
}

export type AuthActions =
	| { type: 'login'; payload: UserType | null }
	| { type: 'logout' }

function reducer(state: AuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case 'login': {
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			}
		}
		case 'logout': {
			return {
				...state,
				user: null,
				isAuthenticated: false,
			}
		}
		default:
			throw new Error('Unknown auth action')
	}
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
}

function AuthProvider({ children }: AuthProviderProps) {
	const initialState = {
		user: {},
		isAuthenticated: false,
	}

	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	)

	function login(email: string, password: string) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({
				type: 'login',
				payload: FAKE_USER,
			})
	}

	function logout() {
		dispatch({ type: 'logout' })
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext)

	if (context === undefined)
		throw new Error('AuthContext was used outside of the AuthProvider')
	return context
}

export { AuthProvider, useAuth }
