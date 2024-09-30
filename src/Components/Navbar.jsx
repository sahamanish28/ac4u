import React, { useState } from 'react'
import './Navbar.css';
import { FaClinicMedical } from 'react-icons/fa';
import { PiPawPrintFill } from 'react-icons/pi';
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaCat } from "react-icons/fa";


export const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("auth");
        localStorage.removeItem("auth2");
        localStorage.removeItem("clinic");
        setMenu("home");
        navigate("/");
    }
    function adlog() {
        window.open('http://localhost:3000/admin_login', '_blank', 'noopener');
    }
    return (
        <>
            <nav className='main-nav act'>
                <div className='logo'>
                    <h2 >
                        <Link style={{ textDecoration: 'none' }} to='/'>
                            <PiPawPrintFill />
                            <span>A</span>nimal
                            <span>C</span>are
                            <span>4U</span>
                        </Link>
                    </h2>
                </div>
                <div className='menu-link'>
                    <ul>
                        <li onClick={() => { setMenu("home") }}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link></li>
                        <li onClick={() => { setMenu("appointment") }}><Link style={{ textDecoration: 'none' }} to='/appointment'>Appointment</Link></li>
                        <li onClick={() => { setMenu("reviews") }}><Link style={{ textDecoration: 'none' }} to='/reviews'>Reviews</Link></li>
                    </ul>
                </div>


                {(localStorage.getItem("auth")) ?
                    <div className='social-media'>
                        <ul >
                            <li onClick={() => { setMenu("profile") }}><Link style={{ textDecoration: 'none' }} to={"/profile"}><CgProfile className='clinic' /></Link></li>

                            <li onClick={logout}><Link style={{ textDecoration: 'none' }} ><MdLogout className='clinic' /></Link></li>
                        </ul>
                    </div>
                    :
                    (localStorage.getItem("auth2")) ?
                        <div className='social-media'>
                            <ul >
                                <li onClick={() => { setMenu("profile") }}><Link style={{ textDecoration: 'none' }} to={"/appointment_requests"}><FaClinicMedical className='clinic' /></Link></li>

                                <li onClick={logout}><Link style={{ textDecoration: 'none' }} ><MdLogout className='clinic' /></Link></li>
                            </ul>
                        </div>
                        :
                        <div className='social-media'>
                            <ul className='social-media-desktop'>
                                <div className="login-fr-user">
                                    <IoMdLogIn className='user' />
                                    <div className="hover-submenu-fr">
                                        <Link to='/signin'><li ><FaCat className='panda' />&nbsp;&nbsp;Pet Owner &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</li></Link>
                                        <Link to='/clinic_signin'><li className='scnd-li-fr'><FaClinicMedical className='clin-fr' />Clinic Owner</li></Link>
                                    </div>
                                </div>
                                <div className="login-fr-admin"><li onClick={() => { adlog() }}><MdOutlineAdminPanelSettings className='clinic' /></li></div>
                            </ul>
                        </div>
                }
            </nav>

        </>
    )
}