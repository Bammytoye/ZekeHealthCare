import React from 'react'
import { Route, Routes } from 'react-router-dom'

//pages
import {
  Home,
  About,
  Contact,
  Doctors,
  Profile,
  MyAppointment,
  Appointment,
  Login
} from './pages';

//components
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={< About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/my-profile' element={<Profile/>} />
        <Route path='/my-appointment' element={<MyAppointment/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App