import React from 'react'
import './SignIn.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from './Footer';




export const SignIn = () => {

    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const navigate=useNavigate();

    async function submit(e){
        e.preventDefault();
            await axios.post('http://localhost:5000/signin',{phone,password})
            .then(e=>{
                if(e.data.messege==="match"){
                    localStorage.setItem('auth',e.data.token);
                    console.log("localstorage filled: ",e.data.token);
                    window.alert("Sign in successfull");
                    window.location.href='/profile';
                    // navigate('/');
                    // window.open('http://localhost:3000/', '_blank','noopener');
                }
                else if(e.data.messege==="not_match"){
                    window.alert("Wrong password");
                }
                else if(e.data.messege==="not_exist"){
                    window.alert("You haven't signup yet, signup first");
                }
                else{
                    window.alert("Something went wrong");
                }
            })
            .catch(error=>{
                console.log(error);
            });
    }

    

  return (
    <><Navbar/>
    <div className="container-main" style={{height:"30vh"}} >
        <div className='container'>

            <form>
                <h1>Pet Owner Login</h1>
                <div className='input-box'>
                        <input type="tel" onChange={e=>{setphone(e.target.value)}} placeholder='Phone Number' required />
                        <FaPhoneAlt className='ico' />
                    </div>

                <div className='input-box'>
                    {/* <input type="password" onChange={e=>{setpassword(e.target.value)}} placeholder='Password' required /> */}
                    <input  type={showPassword ? 'text' : 'password'} onChange={(e) => setpassword(e.target.value)} placeholder='Password' required />
                    {(showPassword)?<FaEyeSlash onClick={togglePasswordVisibility} className='ico'/>:<FaEye onClick={togglePasswordVisibility} className='ico'/>}
                    
                </div>

                <div className="remember-forgot">
                    <br />
                    <Link to="/forget_pass">Forgot Password?</Link>
                </div>

                {/* <Link style={{ textDecoration: 'none'}} to='/Profile'></Link> */}
                    <button type="submit" onClick={e=>{submit(e)}} className='btn'>Login</button>

                <div className="register-link">
                    <p>Don't have an account? <Link style={{ textDecoration: 'none'}} to='/signup'>Register here!</Link></p>
                </div>
            </form>

        </div>
    </div>
    <Footer/>
    </>
  )
}
