import React, { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../ApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user, "user");
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
              type="email"
              placeholder="Email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              required
              minLength={6}
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForget">Forget Password?</span>
  <button className="loginRigesterButton" disabled={isFetching}>
            <Link to="/rigester" style={{textDecoration: "none" , color: "white"}}>
    {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}
</Link>
  </button>

          </form>
        </div>
      </div>
    </div>
  );
}
