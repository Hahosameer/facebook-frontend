import "../rightbar/Rightbar.css";
import OnLine from "../Online/OnLine.jsx";
import { Users } from "../../dummyData.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { serverUrl } from "../../utils/appConstants";
import gift from "../../../public/assets/gift.png";
import adpmg from "../../../public/assets/ad.png";
import person11 from "../../../public/assets/person/11.jpeg";

export default function Rightbar({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const currentUser = JSON.parse(localStorage.getItem('loginUser'))
  const [friend, setFriend] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const [follow, setFollow] = useState(
    currentUser?.followers.includes(user?._id)
  );
  console.log(currentUser, "user right bar");

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${serverUrl}/api/users/friends/` + currentUser?._id);
        setFriend(friendList.data);
        console.log(friendList.data, "frienlist data");
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);
  // console.log(currentUser, "user right bar");
  const handleClick = async () => {
    try {
      if (follow) {
        await axios.put(
          `${serverUrl}/api/users/` + user?._id + "/unfollow",
          { userId: currentUser?._id }
        );
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axios.put(
          `${serverUrl}/api/users/` + user?._id + "/follow",
          { userId: currentUser._id }
        );
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
      setFollow(!follow);
    } catch (error) {
      console.log(error);
    }
  };
  const HomeRightbar = () => {
    return (
      <div className="container">
        <div className="birthdayContainer">
          <img className="birthdayImg" src={gift} alt="" />
          <span className="birthdayText">
            <b>Pola Foster </b> and <b>3 other friends</b> hav a birhday today
          </span>
        </div>
        <img className="rightbarAd" src={adpmg} alt="" />
        <h4 className="rightbarTittle">Online Friends</h4>

        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <OnLine key={user?.id} user={user} />
          ))}
        </ul>
      </div>
    );
  };

  const ProfileRightbar = () => {
    return (
      <div className="Userinformation">
        {user?.username !== currentUser?.username && (
          <button className="profileRightbarButton" onClick={handleClick}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTittle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="userTittle">User friends</h4>
        <div className="rightbarFollowings">
          {friend.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "black" }}
              key={friend._id} // Use a unique key here
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    person11
                  }
                  alt=""
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
