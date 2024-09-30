import React, { useEffect } from 'react'
// import { FaStar } from 'react-icons/fa';
import './Starrating.css'; // Import the CSS file for styling
import './Review.css'
import { BiSolidLocationPlus } from 'react-icons/bi';
import Stars from './Stars';
import { useState } from 'react';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from './Footer';



export default function Reviews() {

  const [reviews, setreviews] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/reviews")
      .then(reviews => { setreviews(reviews.data) })
      .catch(err => { console.log(err); })
  })


  const viewmap = (place) => {
    // Construct the Google Maps URL with the specified latitude and longitude
    var mapsUrl = "https://www.google.com/maps?q=" + place;
    console.log(place)

    // Open a new window or tab with the Google Maps URL
    window.open(mapsUrl, "_blank");
  }

  return (
    <>
    <Navbar/>
    <div className="backGround" style={{width:"98vw"}}>

      {(reviews)

        ?
        reviews.map((review, i) => {
          return (

            <div className="review-Container slide">
              <div className='clinicName' > <h3>{review.clinicname}</h3></div>
              <div className="desc"><p>{review.clinicdesc}</p><br /> </div>
              <div className="ratting"><span><BiSolidLocationPlus className='icon-loc' />{review.cliniclocality}</span>
                <Stars stars={review.rating} reviews={review.no_of_rating} />
              </div><br />
              <div>
                <button className='viewmap' onClick={()=>viewmap(review.cliniclocality)}>Locate</button>
              </div>
            </div>

          )
        })

        :
        <h1>No reviews</h1>}

    </div>
    <Footer/></>

  )
}
