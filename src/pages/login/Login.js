import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar2 from "../../components/navbar2/Navbar2";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../components/reduxContainer/ApiCall";

function Login() {
  const dispatch = useDispatch()
  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {email, password});
  }

  return (
    <>
      <div className="SignUpContainer">
        <Navbar2 />
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>LOGIN</h4>
            <span>We Are Happy To See You Again...!</span>
          </div>

            <div className="inputContainer">
              <input type="email" onChange={(e)=>setEmail(e.target.value)} id='email' placeholder="Email" />
              <input type="password" onChange={(e)=>setPassword(e.target.value)} id='password' placeholder="Password" />
              <button type="submit" onClick={handleLogin} className="loginButton">
                Login
              </button>
            </div>

            <div className="logFooterContainer">
            <span style={{marginBottom:10}}>
                Forgot Password?{" "}
                <Link to="/forgot/password" style={{ fontWeight: "bold", color: "red" }}>
                  Reset Now
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

export default Login;
