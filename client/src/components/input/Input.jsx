export default function Input({ type, label, placeholder, name, id, onChange, defaultValue }) {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder}
				onChange={onChange}
				className='border-2 px-2  rounded-md py-1.5 border-[#A55B4B] focus:border-[#DCA06D] outline-none'
				required
			/>
		</div>
	);
}
