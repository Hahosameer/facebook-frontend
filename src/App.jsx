import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Rigester from "./pages/Rigester/Rigester";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  const user1 = JSON.parse(localStorage.getItem('loginUser'))
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

export default App;
