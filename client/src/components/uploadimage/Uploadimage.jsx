import { useState } from "react";


const ImageUploader = ({ image, setImage, imageUrl }) => {
	const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl); 
	const handleImageChange = (e) => {
		const file = e.target.files[0];
        setImage(file);
		if (file && file.type.startsWith("image/")) {

			setUpdatedImageUrl(URL.createObjectURL(file));
		} else {
			alert("Please select a valid image file (png, jpg, jpeg)");
		}
	};

	return (
		<div className='flex items-center justify-center'>
			<label htmlFor='fileInput'>
				<div className='w-32 h-32 rounded-full overflow-hidden cursor-pointer border-1 border-[#A55B4B] '>
					{image ? (
						<img
							src={updatedImageUrl}
							alt='Uploaded'
							className='w-full h-full object-cover'
						/>
					) : (
						<div
							className='flex items-center justify-center h-full text-[#A55B4B] bg-center bg-cover'
							style={{ backgroundImage: ` url(${ imageUrl  ? imageUrl :  "person-placeholder.jpg"}) ` }} 
						></div>
					)}
				</div>
			</label>
			<input
				id='fileInput'
				type='file'
				name='image'
				accept='image/png, image/jpeg, image/jpg'
				onChange={handleImageChange}
				className='hidden'
			/>
		</div>
	);
};

export default ImageUploader;
