import React from 'react'
import './Home.css'
import videoBg from '../Assets/video_02.mp4'
import Starrating from './Starrating'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Home = () => {

  return (

    <>
    <Navbar/>
      <div className='home-main'>

        {/* <div className='videobg-main'> */}
          {/* <div className='videobg'> */}
            
          {/* </div> */}
        {/* </div> */}
        <video src={videoBg} autoPlay loop muted playsInline className='video-container-main'></video>

        <div className="text-video-main">
          <div className="text-main">
            <h2>"<span>A pet</span> is the only thing on Earth that will love you more than you love yourself."</h2>
          </div>

          <div className='imagSlider-main'>    
            <div className='imgSlider'></div>         
          </div>
        </div>

        <div className="vision">
          <div className='vision-h2'>
            <h2>Our Vision</h2>
          </div>
          
          <div className="vision-p">
          <p>Our focus is to provide a convenient and efficient way for pet owners to find and book appointments with veterinarians, both for routine check-ups and emergency care. Our targeted audience are Pet owners of all ages and experience levels. By this project we are going to simplify a major real life problem based on pets. Pets are very loving thing to us. They can’t understand their language so, sometime this is difficult to understand there situation or health issues. So when they fill illness they can’t express there selves when we understand it its already late, sometime it’s too late to do anything but some time we have time but not have the scope to give a proper treatment to our beloved pets or strays. Our aim to build this project to fulfil the gap between the time and the scope for every animals whether it’s yours beloved pets or yours beloved stray friend. In future we may include a first aid portion for emergency cases, but today our aim to give a scope of multiple options for known and unknown vet treatment centers for their relief.</p>
          </div>
        </div>
          
      </div>
      <Footer/>
    </>
  )
}
