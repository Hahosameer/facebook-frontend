import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Feedbar from "../../components/feedbar/Feedbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.css";
const PF = import.meta.env.VITE_PUBLIC_FOLDER;

import person1 from "../../../public/assets/person/1.jpeg";
import person2 from "../../../public/assets/person/2.jpeg";
import person3 from "../../../public/assets/person/3.jpeg";
import person4 from "../../../public/assets/person/4.jpeg";
import person5 from "../../../public/assets/person/5.jpeg";
import person6 from "../../../public/assets/person/6.jpeg";
import person7 from "../../../public/assets/person/7.jpeg";
import person8 from "../../../public/assets/person/8.jpeg";
import person9 from "../../../public/assets/person/9.jpeg";
import person10 from "../../../public/assets/person/10.jpeg";
import person11 from "../../../public/assets/person/11.jpeg";
import person12 from "../../../public/assets/person/12.jpg";
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
        console.log("Response Data:", res.data);
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
                src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={ user.profilePicture ?PF + user.profilePicture : PF + "person/11.jpeg"}
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
