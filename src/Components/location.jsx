import React, { useState, useEffect } from 'react';
import './Appointment.css';
import axios from 'axios';

const SelectOption = (props) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [locations, setLocations] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [clinicsdata, setclinicsdata] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/appointment/`)
      .then(clinics => { 
        setclinicsdata(clinics.data);
        console.log(clinics.data);
       })
      .catch(err => { 
        console.log(err); 
      });
    const uniqueLocations = Array.from(new Set(clinicsdata.map(item => item.cliniclocality)));
    setLocations(uniqueLocations);
    console.log(locations);
  },[clinicsdata,locations]);

  const handleOptionChange = (e) => {
    const selectedLocation = e.target.value;
    setSelectedOption(selectedLocation);
    const filteredClinics = clinicsdata.filter(item => item.cliniclocality === selectedLocation);
    setClinics(filteredClinics.map(item => item.clinicname));
    props.sendOption(selectedLocation);
  };

  const handleSubOptionChange = (e) => {
    setSelectedSubOption(e.target.value);
    props.sendSubOption(e.target.value);
  };

  return (
    <>
      <div className="input-fields">
        <label>Select Location</label>
        <select value={selectedOption} onChange={handleOptionChange} className='list' required>
          <option value=''>--Select Option--</option>
          {locations.map((location, i) => (
            <option key={i} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="input-fields">
        <label>Choose Clinic</label>
        <select value={selectedSubOption} onChange={handleSubOptionChange} className='list' required>
          <option value=''>--Select Options--</option>
          {clinics.map((clinic, j) => (
            <option key={j} value={clinic}>
              {clinic}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectOption;
