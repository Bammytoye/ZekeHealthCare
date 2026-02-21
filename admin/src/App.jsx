import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import Appointments from "./pages/Admin/Appointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  console.log("Admin Token:", aToken, "Doctor Token:", dToken);

  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* Admin routes */}
          <Route path='/admin_dashboard' element={<Dashboard />} />
          <Route path='/all_appointments' element={<Appointments />} />
          <Route path='/add_doctor' element={<AddDoctor />} />
          <Route path='/doctor_list' element={<DoctorList />} />

          {/* Doctor routes */}
          <Route path='/doctor_dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor_appointments' element={<DoctorAppointment />} />
          <Route path='/doctor_profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;