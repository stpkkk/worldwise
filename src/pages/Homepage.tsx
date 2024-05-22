import { Link } from 'react-router-dom'
import { AppNav, PageNav } from '../components'

function Homepage() {
	return (
		<div>
			<PageNav />
			<AppNav />
			<h1>WorldWise</h1>
			<Link to='/app'>Go to the app</Link>
		</div>
	)
}

export default Homepage
