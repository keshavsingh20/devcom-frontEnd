import React from 'react'
import './Navbar2.css'
import { Link } from 'react-router-dom'
import profileImage from '../images/Profile.png'

function Navbar2() {
  return (
    <>
      <header>
        <input type="checkbox" name="" id="chk1" />
        <div className="logo">
        <Link to="/" style={{color: '#fff'}}>
          <h1>DevCom</h1>
          </Link>
        </div>

        <ul>
          <li><Link to="/"><i className="fa fa-home navIcons"></i></Link></li>
          <li><a herf="#"><i className="fab fa-facebook-messenger navIcons"></i></a></li>
          <li><a href="#"><i className="fa fa-user navIcons"></i></a></li>
          <li><a href="#"><i className="fa fa-user-plus navIcons"></i></a></li>
          <li className="profile">
            <a href="#">
              <img src={`${profileImage}`} alt="" />
            </a>
          </li>
          <li><Link to="/login"><i className="fa fa-sign-in navIcons"></i></Link></li>
        </ul>

        <div className="menu">
          <label htmlFor="chk1">
            <i className="fa fa-bars"></i>
          </label>
        </div>
      </header>
    </>
  )
}

export default Navbar2
