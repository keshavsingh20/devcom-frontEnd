import React from 'react'
import './Navbar.css'
import profileImage from '../images/Profile.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reduxContainer/UserReducer';


function Navbar() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  let id = user.other._id;
  const dispatch = useDispatch();

  const hadleLogout = ()=> {
    dispatch(logout());
  }

  return (
    <>
      <header>
        <input type="checkbox" name="" id="chk1" />
        <div className="logo">
          <Link to="/" style={{color: '#fff'}}>
          <h1>DevCom</h1>
          </Link>
        </div>
        <div className="search-box">
        </div>
        <ul>
          <li><Link to="/"><i className="fa fa-home navIcons"></i></Link></li>
          <li><Link to="/chat"><i className="fab fa-facebook-messenger navIcons"></i></Link></li>
          <li><Link to="/connections"><i className="fa fa-user navIcons"></i></Link></li>
          <li><Link to="/suggestions"><i className="fa fa-user-plus navIcons"></i></Link></li>
          <li className="profile">
            <Link to={`/profile/${id}`}>
              <img src={`${user.other.profile}`} alt="" />
            </Link>
          </li>
          <li onClick={hadleLogout}>
            <Link to="" onClick={hadleLogout}><i className="fa fa-sign-out navIcons"></i></Link>
            </li>
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

export default Navbar
