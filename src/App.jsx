import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Rigester from "./pages/Rigester/Rigester";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./components/context/AuthContext";
import styled from "styled-components";
import person11 from "../public/assets/person/13.png";

function App() {
  const { user } = useContext(AuthContext);
  const user1 = JSON.parse(localStorage.getItem('loginUser'))
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  if (loading) {
    return (
      <LoadingContainer>
        {/* <img src="public/assets/person/facebookm.png" alt="logo Logo" /> */}
        <img src={person11} alt="" />
       
      </LoadingContainer>
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user || user1 ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user  || user1 ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/rigester"
          element={user  || user1 ? <Navigate to="/" replace /> : <Rigester />}
        />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  img {
    width: 180px;
    object-fit: contain;
    @media (max-width: 768px) {
      width: 80px;
    object-fit: contain;
  }
  }

`;

export default App;
