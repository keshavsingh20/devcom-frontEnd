import React, { useState } from "react";
import "./VerifyEmail.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar2 from "../../components/navbar2/Navbar2";
import { useSelector, useDispatch } from 'react-redux'
import { verifyEmail } from "../../components/reduxContainer/ApiCall";


function VerifyEmail() {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState('');
  const user = useSelector((state) => state.user);
  const userDetails = user.user;
  const id = userDetails?.user;

  const handleOTP = (e) => {
    e.preventDefault();
    verifyEmail(dispatch, { OTP: OTP, user: id });
  }

  return (
    <>
      <div className="SignUpContainer">
        <Navbar2 />
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>Verify Your Email</h4>
            {/* <span>We Are Happy To See You Again...!</span> */}
          </div>


          <div className="inputContainer">
            <input type="number" onChange={(e) => setOTP(e.target.value)} id='email' placeholder="Enter Your OTP" />
            <button type="submit" onClick={handleOTP} className="loginButton">
              Confirm OTP
            </button>
          </div>

          <div className="logFooterContainer">
            <span style={{ marginBottom: 10 }}>
              <Link to="/register" style={{ fontWeight: "bold", color: "red" }}>
              Check your email to get a OTP
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
