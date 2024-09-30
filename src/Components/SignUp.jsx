import React, { useState } from 'react';
import firebase from './Firebase';
import './SignUp.css';
// import './SignUp2.css';
import { BiSolidUser } from 'react-icons/bi';
import { FaEyeSlash, FaEye, FaPhoneAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export  const SignUp = () => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [pass2, setpass2] = useState('');
    const [otp, setotp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [cansignup, setcansignup] = useState(false);
    const navigate = useNavigate();
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    const openOtpModal = () => {
        // sendOTP()
        setOtpModalVisible(true);
    };


    const closeOtpModal = (e) => {
        setOtpModalVisible(false);
        if(e===1){
            document.querySelector('.verisucces').innerHTML='<span>Number verified 👍</span>'
            setcansignup(true);
        }
        else{
            document.querySelector('.verisucces').innerHTML='<p>Verification Interupted !</p>'
            setcansignup(false);
        }
        
    };



    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
            console.log("Recaptca varified")
          },
          defaultCountry: "IN"
        });
      }

      const onSignInSubmit = (e) => {
        e.preventDefault()
        configureCaptcha()
        const phoneNumber = "+91" + phone;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            openOtpModal()
            console.log("OTP has been sent")
            
            // openOtpModal()
    
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("SMS not sent")
          });
      }
      const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = otp;
        let c=1
        // console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
        //   const user = result.user;
        //   console.log(JSON.stringify(user));
        //   setcansignup(true);
          alert("User is verified")
          closeOtpModal(c)
          
          
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          c=0
          closeOtpModal(c)
        });
      }

    


    const submit = (e) => {
        e.preventDefault();
        if (password === pass2) {
            if(cansignup){
                axios.post('http://localhost:5000/signup', { username,email, phone, password })
                    .then((response) => {
                        if (response.data.message === 'exists') {
                            window.alert('Phone number already exists, enter another phone number');
                        } else if (response.data.message === 'success') {
                            window.alert('Registration successful :)');
                            navigate('/SignIn');
                        } else {
                            window.alert('Something went wrong');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else{
                window.alert("OTP is not verified, verify OTP first");
            }                            
        } else {
            window.alert('Password did not match, try to sign up again');
        }
    };

    return (
        <><Navbar/>
        <div className="container-main">
            <div className="container">
                <form>
                    <h1>Pet Owner Sign Up</h1>
                    <div className="input-box">
                        <input type="text" onChange={(e) => setusername(e.target.value)} placeholder="Username" required />
                        <BiSolidUser className="ico" />
                    </div>

                    <div className="input-box">
                        <input type="email" onChange={(e) => setemail(e.target.value)} placeholder="Email" required />
                        <BiSolidUser className="ico" />
                    </div>

                    <div className="input-box otp ">
                        <input type="tel" id='sign-in-button' onChange={(e) => setphone(e.target.value)} placeholder="Phone Number" required />
                        <FaPhoneAlt className="ico phn" />
                        <button type="submit" onClick={onSignInSubmit} className="">Get OTP</button>
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
                    <div className="verisucces"><span className='veritext'></span></div>
                     
                          
                    

                    <button type="submit" onClick={submit} className="btn">Sign Up</button>

                    <div className="register-link">
                        <p>Already have an account? <Link style={{ textDecoration: 'none' }} to="/signin">Login</Link></p>
                    </div>
                </form>
                <div id="recaptcha-container"></div>

                {otpModalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            {/* <form action="#"> */}
                            <h2>Verify Your Number</h2>
                           
                            <p>OTP Succesfully send to your number 😊 !</p><br/>
                            
                             <input type="tel" onChange={(e) => setotp(e.target.value)} placeholder="Enter OTP" required />
                             <button type="submit" onClick={onSubmitOTP} >Verify</button> 
                             
                            <br/><br/>
                            <span onClick={closeOtpModal}>don't get a OTP ? Go back!</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
        <Footer/>
        </>
    );
};
