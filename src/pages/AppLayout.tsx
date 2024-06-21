import { Sidebar, Map, User } from '../components'
import styles from './AppLayout.module.css'

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	)
}

export default AppLayout
