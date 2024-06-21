import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context'
import styles from './User.module.css'

function User() {
	const navigate = useNavigate()
	const { user, isAuthenticated, logout } = useAuth()

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.stopPropagation()
		if (isAuthenticated) {
			logout()
			navigate('/')
		}
	}

	return (
		!!user && (
			<div className={styles.user}>
				<img src={user.avatar} alt={user.name} />
				<span>Welcome, {user.name}</span>
				<button onClick={handleClick}>Logout</button>
			</div>
		)
	)
}

export default User
