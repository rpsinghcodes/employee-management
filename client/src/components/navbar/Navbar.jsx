import { Link, useNavigate } from "react-router-dom";
import GhostButton from "../button/Ghostbutton";
import PrimaryButton from "../button/Primarybutton";

export default function Navbar() {
  const navigate = useNavigate();
  function handleClick(){
    localStorage.removeItem("token");
    navigate('/login');
  }
	return (
		<header className='flex justify-between items-center px-6 py-3 bg-[#DCA06D]'>
			<div>
				<Link to='/'>Employee Management</Link>
			</div>
			<div className='flex gap-4'>
				<Link to='/addemployee'>
					<PrimaryButton text={"Add Employee"} />
				</Link>
				<GhostButton text={"Logout"} onClick={handleClick} />
			</div>
		</header>
	);
}
