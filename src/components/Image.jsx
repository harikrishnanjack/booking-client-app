export default function Image({ src, ...rest }) {
	src =
		src && src.includes('https://')
			? src
			: 'http://localhost:4001/uploads/' + src;
	return (
		<img
			{...rest}
			src={src}
			alt={''}
		/>
	);
}
