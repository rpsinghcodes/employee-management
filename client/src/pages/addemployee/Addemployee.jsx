import { useState } from "react";
import PrimaryButton from "../../components/button/Primarybutton";
import Input from "../../components/input/Input";
import Navbar from "../../components/navbar/Navbar";
import ImageUploader from "../../components/uploadimage/Uploadimage";
import axios from "axios";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function Addemployee() {
	const navigate = useNavigate(); 
	const [formData, setData ] = useState({
		firstname: "",
		lastname: "",
		email: "",
		contact: ""
	});
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	function handleChange(e) {
		setData({
			...formData,
			[e.target.name]: e.target.value
		});
	}



	async function handleSubmit(e) {
		const token = localStorage.getItem("token");
		e.preventDefault();
		formData.image = image;
		setLoading(true);
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/employee/signup`,
			formData,
			{
				headers: {
					authorization: token,
					"Content-Type": "multipart/form-data",
				},
			}
		);

		if(response.status === 201){
			toast.success("Employee added successfully");
		}
		else if(response.status === 400){
			toast.error(response.data.message);
		}

		console.log(response);
		setLoading(false);
	}

	if(localStorage.getItem("token") == null){
		navigate('/login');
	}
	return (
		<>
			<Navbar />
			<form
				className='flex flex-col items-center gap-8'
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col  gap-10 p-4 items-center justify-center text-[#210F37]'>
					<div className='flex flex-col gap-4 items-center'>
						<ImageUploader image={image} setImage={setImage} />
						<span>Upload Image</span>
					</div>
					<div className='flex  flex-col '>
						<div className='flex gap-3'>
							<Input
								type='text'
								label='First Name'
								placeholder='First Name'
								name='firstname'
								id='firstname'
								defaultValue={formData.firstname}
								onChange={handleChange}
							/>
							<Input
								type='text'
								label='Last Name'
								placeholder='Last Name'
								name='lastname'
								id='lastname'
								defaultValue={formData.lastname}
								onChange={handleChange}
							/>
						</div>
						<div className='w-1/2'>
							<Input
								type='email'
								label='Email'
								placeholder='Email'
								name='email'
								id='email'
								defaultValue={formData.email}
								onChange={handleChange}
							/>
							<Input
								type='number'
								label='contact'
								placeholder='Contact'
								name='contact'
								id='contact'
								defaultValue={formData.contact}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				<PrimaryButton text={loading ? "Submitting..." :"Add Employee"}   disabled={loading}/>
			</form>
		</>
	);
}
