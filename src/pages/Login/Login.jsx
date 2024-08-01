import React, { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../ApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    // Field validation
    if (!email.current.value || !password.current.value) {
      toast.error("Please fill out all fields");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.current.value)) {
      toast.error("Invalid email address");
      return;
    }

    // Attempt login
    try {
      await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );

      // After successful login check
      if (user?.email !== email.current.value || user?.password !== password.current.value) {
        toast.error("Incorrect email or password");
      } else {
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Login failed! Incorrect email or password");
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
              type="email"
              label="Email"
              required
              className="loginInput"
              inputRef={email}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              required
              minLength={6}
              className="loginInput"
              inputRef={password}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              className="loginButton"
              type="submit"
              disabled={isFetching}
              fullWidth
            >
              {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Login"}
            </Button>
            <span className="loginForget">Forget Password?</span>
            <Button
              variant="outlined"
              className="loginRigesterButton"
              disabled={isFetching}
              fullWidth
            >
              <Link to="/rigester" style={{ textDecoration: "none", color: "inherit" }}>
                {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}
              </Link>
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
