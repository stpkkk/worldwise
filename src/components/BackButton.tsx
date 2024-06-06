import { useNavigate } from 'react-router-dom'
import Button from './Button'

interface BackButtonProps {}

function BackButton({}: BackButtonProps) {
	const navigate = useNavigate()

	function handleBack(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault()
		navigate(-1)
	}
	return (
		<Button onClick={handleBack} type='back'>
			&larr; Back
		</Button>
	)
}

export default BackButton
