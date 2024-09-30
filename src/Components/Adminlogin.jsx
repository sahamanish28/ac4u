import React, { useState } from 'react'
import { RiCustomerService2Line } from "react-icons/ri";
import './AdminKey.css';

export default function Adminlogin() {

  const [key, setkey] = useState('');

  const submit = () => {
    if (key === "abcd69xyz108") {
      window.alert("Successfully passkey matched");
      window.location.href='http://localhost:3000/admin';
      localStorage.setItem('admin', 'yes');
    }
    else {
      window.alert("Wrong credential");
    }
  }
  return (
    <>
      <div className="key-container-bg">
        <div className="key-conatiner-holder">
          <RiCustomerService2Line className='help-icons' />
          <br /><span className="heading">
            Welcome Admin
          </span><br />
          <br /><br /><br />
          <label htmlFor="keytag" className="keytag">Enter Key </label><br /><br />
          <input type="password" className="key-input" onChange={(e)=>{setkey(e.target.value)}} placeholder="Enter your Key" /> <br />
          <button onClick={()=>{submit()}} className='admin-login-btn-fr'>Login</button>
        </div>
      </div>
    </>
  )
}
