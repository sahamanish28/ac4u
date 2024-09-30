import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { IoPaw } from "react-icons/io5";
import './ForgetPass.css';
import axios from 'axios';
import ResetPassword from "./ResetPassword";
const ForgetPass_Clinic = () => {
  const [email, setemail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [codes, setCodes] = useState(Array(6).fill(''));
  const [realotp, setrealotp] = useState('');

  const firstInputRef = useRef(null);


  async function sendotp(e) {
    axios.post(`http://localhost:5000/reset_pass_clinic/${email}`)
      .then(result => {
        if (result) {
          console.log(result.data);
          setrealotp(result.data.message);
          openModal();
        }
        else if (result.data.message === "OTP didn't send") {
          window.alert("Can't send otp");
        }
        else if (result.data.message === "Data not found") {
          window.alert("You don't have a account with this mail id, register first or enter a mail id linked with");
        }
        else {
          window.alert("Server problem");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("Can't send otp");
      })
  }

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleChange = (index, value) => {
    // Handle backspace
    if (value === '' && index > 0) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput.focus();
      return;
    }

    // Limit input to one character for the last input box
    if (index === codes.length - 1 && value.length > 1) {
      return;
    }

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value !== '' && index < codes.length - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput.focus();
    }
  };


  const readOTP = () => {
    console.log('otp submitted');
    const rotp = String(realotp);
    const gotp = codes.join('');
    const result = window.confirm(`The entered OTP is: ${gotp}`);
    if (result) {
      if (gotp === rotp) {

        console.log('Verified');
        localStorage.setItem('verified', "yes");
        localStorage.setItem('useremail', email);
        console.log(localStorage.getItem('verified'));
        window.location.href = '/reset_password_clinic';
      } else {
        alert(`Invalid OTP!`);
      }
    } else {
      alert(`Enter the OTP again.`);
    }
  };

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!showModal) {

      setCodes(Array(6).fill(''));
    }
  }, [showModal]);

  return (
    <>
          <div className="bodybg">
            <div className="container-fr">
              <header className='fr-header'><IoPaw />AnimalCare4U </header><br /><br /><br /><br /><br />

              <span>
                Enter the Registered Email Address to verify yourself and reset your password !
              </span><br /><br />
              <br /><br />
              <br />
              <label htmlFor="" id="otpmail-fr-ml">
                Email
              </label>
              <br />
              <input type="email" name="useremail" id="otpmail-fr" onChange={(e) => { setemail(e.target.value) }} placeholder="abcd@gmail.com" required />
              <br />
              <button type="button" onClick={() => { sendotp() }} id="sendotp-fr">
                Continue
              </button><br /><br />

              
            </div></div>

          {showModal && (
            <div className="modal-fr">
              <div className="modal-fr-content">
                <IoClose id='off-fr' className='close-fr' onClick={closeModal} />
                <div className="otp-container">
                  <h2>Verify Your Account</h2>
                  <p id='desc'>
                    We have emailed you a six digit One time Password,Enter the code below to confirm your email address !
                  </p>

                  <div className="code-container">
                    {codes.map((code, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="number"
                        className="code"
                        // placeholder="_"
                        min="0"
                        max="9"
                        value={code}
                        onChange={(e) => handleChange(index, e.target.value)}
                        ref={index === 0 ? firstInputRef : null}
                        required
                      />
                    ))}
                  </div>

                  <div>
                    <button type="button" className="btn-fr btn-fr-primary" onClick={() => { readOTP() }}>Verify</button>
                  </div>

                  <small className="info" onClick={() => { sendotp() }}>
                    If you didn't receive a code !! <strong >RESEND</strong>
                  </small>
                </div>
              </div>
            </div>
          )}
        </>
  );
};

export default ForgetPass_Clinic;