import { useRef } from "react";
import "./rigester.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from "../../utils/appConstants";
export default function Rigester() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(`${serverUrl}/api/auth/register`, user);
        navigate('/login'); // Navigate to login page after successful registration
      } catch (error) {
        console.log(error);
      }
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
            <input
              type="text"
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              type="email"
              placeholder="Email"
              ref={email}
              className="loginInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              className="loginInput"
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={passwordAgain}
              className="loginInput"
              required
            />
            <button className="loginButton" type="submit">Sign Up</button>
            
              <button className="loginRigesterButton">
            <Link to="/login"  style={{textDecoration: "none" , color: "white"}}>
                Log into Account
            </Link>
                </button>
          </form>
        </div>
      </div>
    </div>
  );
}
