export default function PrimaryButton({ text, disabled=false, style }) {
	return (
		<button className={`bg-[#210F37] hover:bg-[#4F1C51] text-white font-bold py-2 px-4 rounded transition ${style}`} disabled={disabled}>
			{text}
		</button>
	);
}
