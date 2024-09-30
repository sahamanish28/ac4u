import React, {useEffect, useState } from 'react';
// import { FaStar } from 'react-icons/fa';
import './Starrating.css'; // Import the CSS file for styling
import './Review.css'
import { BiSolidLocationPlus } from 'react-icons/bi';
import axios from 'axios';
import Stars from './Stars';
// import Views from './Views';



const Starrating = () => {

  const [clinicsdata, setclinicsdata] = useState({});
  useEffect(()=>{
    axios.get('http://localhost:5000/')
      .then(e => {
        setclinicsdata(e.data);
      })
      .catch(err => {
        console.log(err);
      })
},[])

  return (


    <div>
      {clinicsdata.map(clinic => {
        return (
          <div>
            <div className="review-Container slide"></div>
            <div className='clinicName'> <h3>{clinic.clinicname}</h3></div>
            <div className="desc"><p>{clinic.clinicdesc}</p><br /> </div>
            <div className="ratting"><span><BiSolidLocationPlus className='icon-loc' />{clinic.cliniclocality}</span>
              <Stars stars={clinic.rating} reviews={clinic.no_of_rating} />
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Starrating;
