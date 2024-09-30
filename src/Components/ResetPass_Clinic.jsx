import React, { useEffect, useState } from 'react'
import './ForgetPass.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TbMoodSadDizzy } from "react-icons/tb";


const ResetPassword_Clinic = (props) => {
  const email = localStorage.getItem('useremail');
  const [password, setpassword] = useState('');
  const [pass2, setpass2] = useState('');



  useEffect(() => {
    const removeVerifiedTimeout = setTimeout(() => {

      localStorage.removeItem('verified');
      window.location.reload();
    }, 120000);

    return () => {
      clearTimeout(removeVerifiedTimeout);
    };
  }, []);


  async function reset(e) {
    // e.preventdefault();
    if (password === pass2) {
      axios.patch('http://localhost:5000/reset_password_clinic', {email,password})
        .then((result) => {
          if (result.data.message==="password updated") {
            window.alert("Password updated :)");
            localStorage.removeItem('useremail');
            localStorage.removeItem('verified');
            window.location.href = "clinic_signin";
          }
          else if(result.data.message==='User not exists'){
            window.alert('Something went wrong');
          }
          else{
            window.alert("Password not updated");
          }

        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      window.alert("PassWord didn't matched");
    }
  }

  return (
    <>
      {localStorage.getItem('verified') ?
        <div className="CardContainer">
          <h2 className='rspass'>Reset Password!</h2><br />
          <label htmlFor="" id='lbl'>New Passwod</label><br />
          <input type="password" onChange={(e) => { setpassword(e.target.value) }} name="" id="Npass1" className='inp' placeholder='******' /><br /><br />
          <label id='lbl'>Type Again</label><br />
          <input type="text" onChange={(e) => { setpass2(e.target.value) }} name="" id="Npass2" className='inp' placeholder='abcdef' /><br /><br />
          <button type="submit" className='pwsubmit inp' onClick={(e) => { reset(e) }}>Submit</button>
        </div>
        :
        <>

          <h1 style={{ margin: "100px", width: "100%", height: "100%" }}>
            <TbMoodSadDizzy style={{ width: "250px", height: "250px" }} /><br />
            Session timed out <br />
            It seems like your session has been timed out for exeeding the time limit for changing the password <br />
            Kindly <Link to="/forget_passClinic">verify again</Link> for change password :)
          </h1>
        </>
      }

    </>
  )
}

export default ResetPassword_Clinic;