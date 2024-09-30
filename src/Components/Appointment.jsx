import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointment.css';
import SelectOption from './location';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';


// import './Confirmation.css'
// import abc from '../Assets/checkbox.gif';

export default function Appointment() {


  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [pets, setpets] = useState('');
  const [gender, setgender] = useState('');
  const [breed, setbreed] = useState('');
  const [location, setlocation] = useState('');
  const [clinic, setclinic] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [userkey, setuserkey] = useState('');
  const key = localStorage.getItem('auth');

  useEffect(() => {
    if (key) {
      setuserkey(key);
    }
  })

  async function submit(e) {
    e.preventDefault();
    await axios.post('http://localhost:5000/appointment', { userkey, fullname, email, phonenumber, address, pets, gender, breed, location, clinic, date, time })
      .then(e => {
        if (e.data.message === "appointment_done") {
          window.alert(`Appointment has been booked`);
          window.location.reload();
        }
        else if (e.data.message === "can't_make_appointment") {
          window.alert("Sorry, can't book your appointment");
          window.location.reload();
        }
        else {
          window.alert("Something went wrong");
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
<>    <Navbar/>
  <div className='container1-main'>

      {(localStorage.getItem("auth")) ?
        <div className="container1">
          <header>Appointment</header><hr />

          <form>
            <div className="form first">

              <div className="details personal">
                <span className='title'>Owner Details</span>

                <div className="fields">
                  <div className="input-fields">
                    <label htmlFor='fullname'>Full Name</label>
                    <input type="text" id='fullname' onChange={e => { setfullname(e.target.value) }} placeholder='Enter your name' required />
                  </div>

                  <div className="input-fields">
                    <label htmlFor='email'>Email</label>
                    <input type="email" id='email' onChange={e => { setemail(e.target.value) }} placeholder='Enter your email' required />
                  </div>

                  <div className="input-fields">
                    <label htmlFor='phone'>Phone Number</label>
                    <input type="tel" id='phone' onChange={e => { setphonenumber(e.target.value) }} placeholder='Enter your phone number' required />
                  </div>

                  <div className="input-fields">
                    <label htmlFor='address'>Address</label>
                    <input type="text" id='address' onChange={e => { setaddress(e.target.value) }} placeholder='Enter your Address' className='address' required />
                  </div>

                </div>
              </div>

              <div className="details id">
                <span className='title'>Pet Details</span>

                <div className="fields">
                  <div className="input-fields">
                    <label >Select Pet</label>
                    <select onChange={e => { setpets(e.target.value) }} name="Pets" required>
                      <option value="SelectOption">--Select Pet--</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Fish">Fish</option>
                      <option value="Cow">Cow</option>
                      <option value="Goat">Goat</option>
                      <option value="Rabbits">Rabbits</option>
                      <option value="Hamsters">Hamsters</option>
                      <option value="Reptiles">Reptiles</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="input-fields">
                    <label>Select Gender</label>
                    <select onChange={e => { setgender(e.target.value) }} name="Gender" required>
                      <option value="SelectOption">--Select Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="input-fields">
                    <label htmlFor='breed'>Pet Breed</label>
                    <input type="text" id='breed' onChange={e => { setbreed(e.target.value) }} placeholder='Pet breed name'  />
                  </div>

                </div>
              </div>

              <div className="details id">
                <span className='title'>Booking Details</span>

                <div className="fields">

                  <SelectOption sendOption={setlocation} sendSubOption={setclinic} />

                  <div className="input-fields">
                    <label htmlFor='date'>Date of Appointment</label>
                    <input type="date" id='date' onChange={e => { setdate(e.target.value) }} placeholder='Enter appointment date' required />
                  </div>

                  <div className="input-fields">
                    <label>Select Time</label>
                    <select onChange={e => { settime(e.target.value) }} name="Time" required>
                      <option value="SelectOption">--Select Timing--</option>
                      <option value="09:00am - 11:00am">09:00am - 11:00am</option>
                      <option value="11:00am - 01:00pm">11:00am - 01:00pm</option>
                      <option value="02:00pm - 04:00pm">02:00pm - 04:00pm</option>
                      <option value="04:00pm - 06:00pm">04:00pm - 06:00pm</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className='btn-main'>
                <div className='btn1'>
                  <button type="reset">Reset</button>
                </div>

                <div className='btn2'>
                  <button onClick={(e)=>{submit(e)}}>Submit</button>
                </div>
              </div>

            </div>
          </form>
        </div>
        :
        <div className="container1">
          <header>Please log-in to make an appointment</header>
          <br /><br />
          <h1><Link to="/signin"><u>Go to Sign In</u></Link></h1>
        </div>
      }

    </div>
    <Footer/>
    </>
  )

}
