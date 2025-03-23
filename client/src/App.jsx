import Addemployee from "./pages/addemployee/Addemployee"
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login";
import Updateemployee from "./pages/updateprofile/Updateemployee";
import { Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/addemployee" element={<Addemployee />} />
      <Route path="/updateemployee/:id" element={<Updateemployee />} />
      </Routes>
    </>
  )
}

export default App
