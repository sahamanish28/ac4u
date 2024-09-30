import React, { useEffect, useState } from 'react';
import './Profile.css';
import profile from '../Assets/profile.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Cprofile = () => {
  const [user, setUser] = useState({});
  const [phone, setPhone] = useState('');
  const key = localStorage.getItem('auth2');

  useEffect(() => {
    if (key) {
      setPhone(key);
    }

    if (phone) {
      axios.get(`http://localhost:5000/cprofile/${phone}`)
        .then(result => {
          setUser(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    
  }, [phone]);

  return (
    <>
    <Navbar/>
      <div className="profile-container">
          <h1 className="name">Welcome</h1>
          <img src={profile} alt="Profile Picture" className="profile-picture" />
          <h1 className="name">{user.clinicname}</h1>
          <br />
          <h2 className="cprofile_dash0098" onClick={()=>{window.open("http://localhost:3000/appointment_requests", '_blank')}} >
            {/* <Link to="/appointment_requests"> */}
              Go to dashboard
              {/* </Link> */}
          </h2>
      </div>
      <Footer/>
    </>
  );
};
