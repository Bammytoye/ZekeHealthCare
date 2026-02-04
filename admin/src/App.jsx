import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from "./context/AdminContext";


function App() {
  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  ) : (
    <>
      <Login />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  ) 
}

export default App
