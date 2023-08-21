import React, { useState } from "react";
import "./Reset.css";
import { Link, useLocation } from "react-router-dom";
import Navbar2 from "../../components/navbar2/Navbar2";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../components/reduxContainer/ApiCall";
import { useNavigate } from "react-router-dom";

function Reset() {
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.search.split("?")[1];
  console.log(code);
  const [password, setpassword] = useState("");
  const [confPassword, setConfpassword] = useState("")

  // console.log(password);
  const handleClick = async (e) => {
    e.preventDefault();
    password === confPassword ? 
    await fetch(`/api/user/reset/password?${code}`, { method: "PUT", headers: { 'Content-Type': "application/JSON" }, body: JSON.stringify({ password: password }) }).then((data) => {
      alert("Your password reset successfully")
      navigate('/login')
    })
    : alert("Password and Confirm Password Didn't Match...!")
  };

  return (
    <>
      <div className="SignUpContainer">
        <Navbar2 />
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>RESET</h4>
            <span>Enter New Password To Reset Account</span>
          </div>

          <div className="inputContainer" style={{marginTop: 20}}>
            <input type="password" onChange={(e) => setpassword(e.target.value)} id='password' placeholder="Enter New Password" />
            <input type="password" onChange={(e) => setConfpassword(e.target.value)} id='password' placeholder="Confirm New Password" />
            <button type="submit" onClick={handleClick} className="loginButton">
              Reset Password
            </button>
          </div>

          <div className="logFooterContainer">
            <span style={{ marginBottom: 10 }}>
              Already Registered?{" "}
              <Link to="/login" style={{ fontWeight: "bold", color: "red" }}>
                Login Now
              </Link>
            </span>
            <span>
              Haven't Registered Yet?{" "}
              <Link to="/signup" style={{ fontWeight: "bold", color: "red" }}>
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
