import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Feedbar from "../../components/feedbar/Feedbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.css";
const PF = import.meta.env.VITE_PUBLIC_FOLDER;

import person11 from "../../../public/assets/person/11.jpeg";

import noCover from "../../../public/assets/post/8.jpeg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../utils/appConstants";
export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams(); // Destructuring to get username directly
  console.log(username, "username");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/users?username=${username}`);
        // console.log("Response Data:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={noCover}
                alt=""
              />
              <img
                className="profileUserImg"
                src={person11}
                alt=""
              />
            </div>
          </div>
          <div className="profileInfo">
            <h4 className="profieInfoName">{user.username}</h4>
            <span className="profieInfoDesc">{user.desc}</span>
          </div>
          <div className="profileRightBottom">
            <Feedbar username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
