import { Sidebar, Map } from '../components'
import styles from './AppLayout.module.css'

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
		</div>
	)
}

export default AppLayout
