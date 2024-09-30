// import './Confirmation.css'
// import Appointment from '../App_form/Appointment';
const Confirmation = () => {
    
    const popup=document.getElementById("popup");
    const openPopup=()=>{
        popup.classList.add("open-popup")
    }
    const closePopup=()=>{
        popup.classList.remove("open-popup")
    }
   
   
  return (
    <div className="container2">
        <button className='btn' type='button' onClick={openPopup}>Submit</button>
        <div className="popUp" id='popup'>
            <img id='gif' src='../public/images/checkbox.gif' alt='icon'/>
            <h3>Thank You!</h3>
            <p>Your form has been submitted successfully.</p>
            <button id='ok' type='button' onClick={closePopup}>OK</button>
        </div>
    </div>
  )
}


export default Confirmation