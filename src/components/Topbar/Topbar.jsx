import "../Topbar/topber.css";
import SearchIcon from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"; // Import useState
import person11 from "../../../public/assets/person/11.jpeg";
import { AuthContext } from "../../components/context/AuthContext";
import TemporaryDrawer from "../Drawer";

const PF = import.meta.env.VITE_PUBLIC_FOLDER;
import {
  Settings as SettingsIcon,
  Help as HelpIcon,
  Accessibility as AccessibilityIcon,
  Feedback as FeedbackIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";




export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [logoutBarOpen, setLogoutBarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
    setLoggedInUser(loggedInUser);

    // Check initial screen width
    handleScreenWidth(window.innerWidth);

    // Event listener for screen width change
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logoutHandler = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("loginUser");
    setLoggedInUser(null);
  };

  const toggleLogoutBar = () => {
    setLogoutBarOpen(!logoutBarOpen);
  };

  const handleResize = () => {
    handleScreenWidth(window.innerWidth);
  };

  const handleScreenWidth = (width) => {
    // Define your custom threshold here (e.g., 800px)
    const threshold = 800;
    setIsSmallScreen(width <= threshold);
  };

  return (
    <div className="topberContainer">
      <div className="topberLeft">
        {isSmallScreen && <TemporaryDrawer />}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Facebook</span>
        </Link>
      </div>
      <div>
            
            </div>
      <div className="topberCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friend, post or video"
            className="SearchInput"
          />
        </div>
      </div>
      <div className="topberRight">
        {loggedInUser && ( // Render only if user is logged in
          <div className="topberIcons">
            <div className="topberIconsItme">
              <Person />
              <span className="topberItemBadge">1</span>
            </div>
            <div className="topberIconsItme">
              <ChatIcon />
              <span className="topberItemBadge">2</span>
            </div>
            <div className="topberIconsItme">
              <NotificationsIcon />
              <span className="topberItemBadge">1</span>
            </div>
          </div>
        )}
        {loggedInUser && (
          <img
            src={
              loggedInUser.profilePicture
                ? PF + loggedInUser?.profilePicture
                : person11
            }
            alt=""
            className="topberImg"
            onClick={toggleLogoutBar}
          />
        )}
        {logoutBarOpen && (
          <div className="logoutbar">
            <ul className="drawer">
              <div className="spanUser">
                <Link
                  to={`/profile/${loggedInUser?.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <li className="rightbarListItem" >
                    {loggedInUser && (
                      <img
                        src={
                          loggedInUser.profilePicture
                            ? PF + loggedInUser?.profilePicture
                            : person11
                        }
                        alt=""
                        className="topberImg"
                      />
                    )}
                    <span className="sidebarItemText">
                      {loggedInUser?.username}
                    </span>
                  </li>
                </Link>
              </div>

              <li className="rightbarListItem">
                <SettingsIcon className="sidebarIcon" />
                <span className="sidebarItemText">Settings & privacy </span>
              </li>
              <li className="rightbarListItem">
                <HelpIcon className="sidebarIcon" />
                <span className="sidebarItemText">Help & support </span>
              </li>
              <li className="rightbarListItem">
                <AccessibilityIcon className="sidebarIcon" />
                <span className="sidebarItemText">
                  Display & accessibility{" "}
                </span>
              </li>
              <li className="rightbarListItem">
                <FeedbackIcon className="sidebarIcon" />
                <span className="sidebarItemText">Give feedback </span>
              </li>
              {loggedInUser && (
                <li className="rightbarListItem" onClick={logoutHandler}>
                  <LogoutIcon className="sidebarIcon" />
                  <span className="sidebarItemText">Log Out</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
