import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { useMockAdapter } from './api'
import './index.css'

// Initialize the mock adapter
useMockAdapter()

// Create a root container for the React app
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container as HTMLElement)

// Render the app
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
