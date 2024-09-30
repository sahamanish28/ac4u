import React, { useEffect, useState } from 'react';
import './Profile.css';
import profile from '../Assets/profile.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Profile = () => {
  const [user, setUser] = useState({});
  const [phone, setPhone] = useState('');
  const key = localStorage.getItem('auth');

  useEffect(() => {
    if (key) {
      setPhone(key);
    }

    if (phone) {
      axios.get(`http://localhost:5000/profile/${phone}`)
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
      {localStorage.getItem('auth')
        ?
        <>
          <Navbar />
          <div className="profile-container">
            <h1 className="name">Welcome</h1>
            <img src={profile} alt="Profile Picture" className="profile-picture" />
            <h1 className="name">{user.username}</h1>
            <br />
            <h2 className="name">
              <Link to="/user_appointment">My appointments</Link>
            </h2>
          </div>
          <Footer />
        </>
        :
        <>
          <h1>Please login with your Idenity</h1>
        </>
      }
    </>
  );
};
