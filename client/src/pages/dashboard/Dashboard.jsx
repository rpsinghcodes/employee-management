import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/card/Card.jsx';
import Navbar from '../../components/navbar/Navbar.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjY3ZGU1Zjg1YjkwNmU4Mzc2NTI0Nzg1NSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiY29udGFjdCI6IjA5ODc3ODEyMzQiLCJpbWdVcmwiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kdXcyeG5hb2IvaW1hZ2UvdXBsb2FkL3YxNzQyNjI2NjkyL3hodWZscXMycDd5cHh4YmEzc3RpLnBuZyIsImlhdCI6MTc0MjYyNjg3NiwiZXhwIjoxNzQyNjI3NDgwfQ.NhH8Yb-PlxQHPnbZHa21tW-l8eyDN4z430ieJOZIkSw"
          }
        });
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    if(localStorage.getItem("token") == null){
      navigate('/login');
    }
  }, []);

  async function deleteEmployee(id) {
    try {
      const token  = localStorage.getItem("token");
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/employee/${id}`, {
        headers: {
          authorization: token
        }
      });
      console.log("response.data: ", response.data);
      if (response.status === 200) {
        toast.success("Employee deleted successfully"); 
      } else if (response.status === 400) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
        <Navbar />
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!loading && !error && <div className='flex gap-4 flex-wrap justify-center  p-8'>
          {employees.map((employee) => (
            <Card key={employee._id} imageUrl={employee.imgUrl} Name={employee.firstname} contact={employee.contact} id={employee._id} onDelete={deleteEmployee} />
          ))}
        </div>}

    </>
  );
}