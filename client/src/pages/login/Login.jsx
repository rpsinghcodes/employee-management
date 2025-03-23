import { useState } from "react";
import PrimaryButton from "../../components/button/Primarybutton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ 
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/employee/login`,
            credentials)
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    localStorage.setItem("token", response.data.token);
                    toast.success("Login Successful");
                    navigate('/');
                }
                else if(response.status === 400){
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                toast.error(error.response.data.message);
                console.log(error.response.data.message);
            });
    }
	return (
		<form className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f8e6e0] to-[#f3d1c5] p-6" onSubmit={handleSubmit}>
			<div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
				<h1 className="mb-8 text-center text-3xl font-bold text-[#A55B4B]">Welcome Back 👋</h1>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="text-lg font-medium text-[#A55B4B]">
							Email Address
						</label>
						<input
							type="email"
                            name="email"
							id="email"
                            onChange={handleChange}
                            defaultValue={credentials.email}
							placeholder="Enter your email"
							className="w-full rounded-lg border-2 border-[#A55B4B] bg-transparent p-3 text-[#5A3E36] placeholder-[#B08B7D] focus:border-[#DCA06D] focus:outline-none focus:ring-2 focus:ring-[#DCA06D]"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="password" className="text-lg font-medium text-[#A55B4B]">
							Password
						</label>
						<input
							type="password"
                            name="password"
                            onChange={handleChange}
                            defaultValue={credentials.password}
							id="password"
							placeholder="Enter your password"
							className="w-full rounded-lg border-2 border-[#A55B4B] bg-transparent p-3 text-[#5A3E36] placeholder-[#B08B7D] focus:border-[#DCA06D] focus:outline-none focus:ring-2 focus:ring-[#DCA06D]"
						/>
					</div>

					<PrimaryButton text="Login" style="w-full py-3 text-lg" />

					{/* <p className="mt-4 text-center text-sm text-[#5A3E36]">
						Don't have an account?
						<a href="/signup" className="ml-1 font-semibold text-[#A55B4B] hover:underline">
							Sign Up
						</a>
					</p> */}
				</div>
			</div>
		</form>
	);
}