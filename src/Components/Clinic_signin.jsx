import React from 'react'
import './SignIn.css'
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { AppointmentReq } from './AppointmentReq';
import { Navbar } from './Navbar';
import { Footer } from './Footer';



const Clinic_signin = () => {
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [islogin, setislogin] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglelogin = () => {
        setislogin(!islogin);
    }

    async function submit(e) {
        e.preventDefault();
        await axios.post('http://localhost:5000/clinic_signin', { phone, password })
            .then(e => {
                if (e.data.messege === "match") {
                    localStorage.setItem('auth2', e.data.token);
                    localStorage.setItem('clinic', e.data.name);
                    window.alert("Login successfull");
                    window.location.href = "/";
                }
                else if (e.data.messege === "not_match") {
                    window.alert("Wrong password");
                }
                else if (e.data.messege === "not_exist") {
                    window.alert("You haven't signup yet, signup first");
                }
                else {
                    window.alert("Something went wrong");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <>
        <Navbar/>
            <div className="container-main" style={{ width: "98vw", height: "50vh" }}>
                <div className='container'>

                    <form>
                        <h1>Clinic Login</h1>
                        <div className='input-box'>
                            <input type="tel" onChange={e => { setphone(e.target.value) }} placeholder='Phone Number' required />
                            <FaPhoneAlt className='ico' />
                        </div>

                        <div className='input-box'>
                            <input type={showPassword ? 'text' : 'password'} onChange={e => { setpassword(e.target.value) }} placeholder='Password' required />
                            {(showPassword) ? <FaEyeSlash onClick={togglePasswordVisibility} className='ico' /> : <FaEye onClick={togglePasswordVisibility} className='ico' />}
                        </div>

                        <div className="remember-forgot">
                            {/* <label><input type="checkbox" />Remember me</label> */}
                            <Link to="/forget_pass_clinic">Forgot Password?</Link>
                        </div>

                        {/* <Link style={{ textDecoration: 'none'}} to='/Profile'></Link> */}
                        <button type="submit" onClick={e => { submit(e) }} className='btn'>Login</button>

                        <div className="register-link">
                            <p>Join Us <Link style={{ textDecoration: 'none' }} to='/clinic_request'><u>Register here!</u></Link></p>
                        </div>
                    </form>

                </div>
            </div>
            <Footer/>
        </>
    )
}


// return (
//     <>{(!islogin)
//         ?

//         :

// }

//     </>
// )


export default Clinic_signin;