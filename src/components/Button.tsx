import { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
	children: ReactNode
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
	type: 'primary' | 'back' | 'position'
}

function Button({ children, onClick, type }: ButtonProps) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
