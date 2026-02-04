import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from "./context/AdminContext";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import Appointments from "./pages/Admin/Appointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";


function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin_dashboard' element={<Dashboard/>}/>
          <Route path='/all_appointments' element={<Appointments/>}/>
          <Route path='/add_doctor' element={<AddDoctor/>}/>
          <Route path='/doctor_list' element={<DoctorList/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
