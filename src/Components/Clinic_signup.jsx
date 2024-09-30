import React from 'react'
import './SignUp.css'
import './Clinicsignup.css'
import { BiSolidUser } from 'react-icons/bi';
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import axios from 'axios';
import { useState } from 'react';
import { MdAlternateEmail } from "react-icons/md";
import { Navbar } from './Navbar';
import { Footer } from './Footer';


const Clinic_signup = () => {

    const [clinicname, setclinicname] = useState('');
    const [cliniclocality, setcliniclocality] = useState('');
    const [clinicdesc, setclinicdesc] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [pass2, setpass2] = useState('');    
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };


    function submit(e) {
        e.preventDefault();
        if (password === pass2) {
            axios.post('http://localhost:5000/clinic_request', { clinicname, cliniclocality, clinicdesc,email, phone, password })
                .then(res => {
                    if (res.data.message === "exists") {
                        window.alert("Phone number already exists, enter other phone number");
                    }
                    else if (res.data.message === "success") {
                        window.alert("Request has been sent :)");
                        window.location.reload();
                    }
                    else {
                        window.alert("Something went wrong");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            window.alert("Password did not match, try to signup again");
        }
    }

    return (
        <><Navbar/>
        <div className="container-main true" style={{width:"98vw"}}>
            <div className='container'>
                <form>
                    <h1>Join With US</h1>
                    <div className='input-box'>
                        <input type="text" onChange={e => { setclinicname(e.target.value) }} placeholder='Clinic name' required />
                        <BiSolidUser className='ico' />
                    </div>

                    <div className='input-box'>
                        <input type="text" onChange={e => { setcliniclocality(e.target.value) }} placeholder='Clinic locality' required />
                        <FaLocationDot className='ico' />
                    </div>

                    <div className='input-box'>
                        <input type="text" onChange={e => { setclinicdesc(e.target.value) }} placeholder='Clinic description' required />
                        <MdDescription className='ico' />
                    </div>

                    <div className='input-box'>
                        <input type="email" onChange={e => { setemail(e.target.value) }} placeholder='Enter email' required />
                        <MdAlternateEmail className='ico' />
                    </div>

                    <div className='input-box'>
                        <input type="tel" onChange={e => { setphone(e.target.value) }} placeholder='Phone Number' required />
                        <FaPhoneAlt className='ico' />
                    </div>

                    <div className="input-box ">
                        <input type={showPassword ? 'text' : 'password'} onChange={(e) => setpassword(e.target.value)} placeholder="New Password" required />
                        {showPassword ? (
                            <FaEyeSlash onClick={togglePasswordVisibility} className="ico eye" />
                        ) : (
                            <FaEye onClick={togglePasswordVisibility} className="ico eye" />
                        )}
                    </div>

                    <div className="input-box">
                        <input type={showPassword2 ? 'text' : 'password'} onChange={(e) => setpass2(e.target.value)} placeholder="Confirm Password" required />
                        {showPassword2 ? (
                            <FaEyeSlash onClick={togglePasswordVisibility2} className="ico eye"  />
                        ) : (
                            <FaEye onClick={togglePasswordVisibility2} className="ico eye" />
                        )}
                    </div>
                    <button type="submit" onClick={(e)=> { submit(e)}} className='btn'>Send Request</button>
                </form>

            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Clinic_signup;