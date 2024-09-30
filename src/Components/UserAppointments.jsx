import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserAppointments.css';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

function UserAppointments() {


  const [phn, setPhn] = useState('');
  const [appointments, setAppointments] = useState([]);
  const key2 = localStorage.getItem('auth');

  useEffect(() => {
    if (key2) {
      setPhn(key2);
      console.log(phn);
    }

    if (phn) {
      axios.get(`http://localhost:5000/user_appointment/${phn}`)
        .then(result => {
          setAppointments(result.data);
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [phn]);

  return (
    <>


      {localStorage.getItem('auth')
        ?
        <>
          <Navbar />
          <div className="bg">
            <div className='appdiv'>
              <table className='apptbl'>
                <thead>

                  <tr>
                    <th className='appth'>Sl No.</th>
                    <th className='appth'>Phonenumber</th>
                    <th className='appth'>Email</th>
                    <th className='appth'>Pets</th>
                    <th className='appth'>Gender</th>
                    <th className='appth'>Location</th>
                    <th className='appth'>Clinic</th>
                    <th className='appth'>Date</th>
                    <th className='appth'>Time</th>
                    <th className='appth'>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment, i) => (
                    <tr key={i}>
                      <td className='apptd'>{i + 1}</td>
                      <td className='apptd'>{appointment.phonenumber}</td>
                      <td className='apptd'>{appointment.email}</td>
                      <td className='apptd'>{appointment.pets}</td>
                      <td className='apptd'>{appointment.gender}</td>
                      <td className='apptd'>{appointment.location}</td>
                      <td className='apptd'>{appointment.clinic}</td>
                      <td className='apptd'>{appointment.date}</td>
                      <td className='apptd'>{appointment.time}</td>
                      <td className='apptd'>{appointment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </>
        :
        <>
          <h1>Please login with your Idenity</h1>
        </>
      }
    </>);
}

export default UserAppointments;
