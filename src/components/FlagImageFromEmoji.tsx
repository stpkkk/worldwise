interface FlagImageFromEmojiProps {
	flag: string
}

function FlagImageFromEmoji({ flag }: FlagImageFromEmojiProps) {
	const countryCode = Array.from(flag, codeUnit => codeUnit!.codePointAt(0)!)
		.map(char => String.fromCharCode(char - 127397).toLowerCase())
		.join('')

	return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />
}

export default FlagImageFromEmoji
