export default function GhostButton({ text, onClick }) {
	return (
		<button className='bg-white hover:bg-[#4F1C51] text-[#210F37] hover:text-white font-bold py-2 px-4 rounded transition border-[#210F37] border-2' onClick={onClick}>
			{text}
		</button>
	);
}
