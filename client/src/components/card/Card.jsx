import { Link } from "react-router-dom";

export default function Card({ imageUrl, Name, contact, id, onDelete }) {
	return (
		<div className='border rounded-md p-4 flex flex-col gap-4 shadow-[10px_10px_25px_-12px_rgba(0,0,0,0.75)]'>
			<div className="size-30 rounded-full bg-center bg-cover  self-center" style={{backgroundImage: `url(${imageUrl})`}} />

            <span>Name: {Name}</span>
            <span>Contact: {contact}</span>
            <div className="flex justify-between gap-4 ">
                <Link to={`/updateemployee/${id}`} className="border px-7 rounded py-2 text-white hover:bg-[#210F37] bg-[#4F1C51] transition">Edit</Link>
                <button className="border px-7 rounded py-2 hover:bg-[#A55B4B] hover:text-white transition border-[#A55B4B]" onClick={() => onDelete(id)}>Delete</button>
            </div>
		</div>
	);
}