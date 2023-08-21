import React, { useState } from "react";
import "./Forgot.css";
import { Link } from "react-router-dom";
import Navbar2 from "../../components/navbar2/Navbar2";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../components/reduxContainer/ApiCall";
import { useNavigate } from "react-router-dom";

function Forgot() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleclick = async (e) => {
    e.preventDefault();
    await fetch(`/api/user/forgot/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify({ email: email })
    }).then(() => {
      alert("We sent you a token on your email")
      navigate("/login")
    }).catch(() => {
      alert("Failed to proccess your request")
    })
  }

  return (
    <>
      <div className="SignUpContainer">
        <Navbar2 />
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>FORGOT PASSWORD</h4>
            <span>Let's Recover Your Account!!!</span>
          </div>

          <div className="inputContainer" style={{ marginTop: 20 }}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} id='email' placeholder="Enter Your Email" />
            <button type="submit" onClick={handleclick} className="loginButton">
              Recover
            </button>
          </div>

          <div className="logFooterContainer">
            <span style={{ marginBottom: 10 }}>
              Already registered?{" "}
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

export default Forgot;
