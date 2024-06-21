import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Button, PageNav } from '../components'
import { useAuth } from '../context'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('jack@example.com')
	const [password, setPassword] = useState('qwerty')
	const { login, isAuthenticated } = useAuth()

	function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (email && password && !isAuthenticated) {
			login(email, password)
		}
	}

	useEffect(() => {
		if (isAuthenticated) navigate('/app', { replace: true })
	}, [isAuthenticated, navigate])

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleSubmitLogin}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type='primary'>Login</Button>
				</div>
			</form>
		</main>
	)
}
