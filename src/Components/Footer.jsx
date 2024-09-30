import React from 'react'
import './Footer.css'

import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { PiPawPrintFill } from 'react-icons/pi';

export const Footer = () => {
  return (
        <div className='footer'>

            <div className="footer-logo">
            <div className='logo'>
                    <h2>
                        <PiPawPrintFill/>
                        <span>A</span>nimal
                        <span>C</span>are4
                        <span>U</span>
                    </h2>
                </div>
            </div>

            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <BsFacebook className='ic'/>
                </div>
                <div className="footer-icon-container">
                    <AiFillInstagram className='ic'/>
                </div>
                <div className="footer-icon-container">
                    <FaXTwitter className='ic'/>
                </div>
            </div>

            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2023 - All Righ Reserved</p>
            </div>

        </div> 
  )
}
