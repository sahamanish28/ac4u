import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Profile } from './Components/Profile';
import { SignUp } from './Components/SignUp';
import { SignIn } from './Components/SignIn';
import Appointment from './Components/Appointment';
import Clinic_signup from './Components/Clinic_signup';
import Reviews from './Components/Reviews';
import UserAppointments from './Components/UserAppointments';
import Login from './Components/Login';
import Adminlogin from './Components/Adminlogin';
import Clinic_signin from './Components/Clinic_signin';
import { Cprofile } from './Components/Cprofile';
import { AppointmentReq } from './Components/AppointmentReq';
import ResetPassword from './Components/ResetPassword';
import ForgetPass from './Components/ForgetPass';
import User from './Components/AdminPages/User';
import Clinic from './Components/AdminPages/Clinic';
import ClinicReq from './Components/AdminPages/ClinicReq';
import ResetPassword_Clinic from './Components/ResetPass_Clinic';
import ForgetPass_Clinic from './Components/Forgetpass_clinic';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/appointment' element={<Appointment />}></Route>
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cprofile' element={<Cprofile />} />
          <Route path='/clinic_signin' element={<Clinic_signin />} />
          <Route path='/clinic_request' element={<Clinic_signup />} />
          <Route path='/user_appointment' element={<UserAppointments />} />
          <Route path='/admin' element={<User />} />
          <Route path='/admin_clinicreq' element={<ClinicReq />}></Route>
          <Route path='/admin_clinic' element={<Clinic />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin_login' element={<Adminlogin />} />
          <Route path='/appointment_requests' element={<AppointmentReq />} />
          <Route path='/forget_pass' element={<ForgetPass />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path='/forget_pass_clinic' element={<ForgetPass_Clinic/>} />
          <Route path='/reset_password_clinic' element={<ResetPassword_Clinic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
