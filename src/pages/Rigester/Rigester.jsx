import React, { useRef } from "react";
import "./rigester.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/appConstants";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Rigester() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    // Field validation
    if (!username.current.value || !email.current.value || !password.current.value || !passwordAgain.current.value) {
      toast.error("Please fill out all fields");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.current.value)) {
      toast.error("Invalid email address");
      return;
    }

    // Password match validation
    if (passwordAgain.current.value !== password.current.value) {
      toast.error("Passwords don't match!");
      return;
    } 

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await axios.post(`${serverUrl}/api/auth/register`, user);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error registering user!");
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">Facebook</div>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <TextField
              type="text"
              label="Username"
              inputRef={username}
              className="loginInput"
              
              fullWidth
              margin="normal"
            />
            <TextField
              type="email"
              label="Email"
              inputRef={email}
              className="loginInput"
              
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              inputRef={password}
              className="loginInput"
              
              minLength={6}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Confirm Password"
              inputRef={passwordAgain}
              className="loginInput"
              
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className="loginButton"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
            <Button variant="outlined" className="loginRigesterButton" fullWidth>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Log into Account
              </Link>
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
