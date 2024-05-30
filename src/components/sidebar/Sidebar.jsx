import "../sidebar/Sidebar.css"
 
 import  RssFeed  from "@mui/icons-material/RssFeed";
 import ChatIcon from '@mui/icons-material/Chat';
 import PlayCircleIcon from '@mui/icons-material/PlayCircle';
 import GroupIcon from '@mui/icons-material/Group';
 import BookmarkIcon from '@mui/icons-material/Bookmark';
 import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
 import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
 import EventIcon from '@mui/icons-material/Event';
 import SchoolIcon from '@mui/icons-material/School';
 import HomeIcon from '@mui/icons-material/Home';
import { Users } from "../../dummyData.js";
import CloseFriend from "../CloseFriend/CloseFriend.jsx";
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" style={{ textDecoration: "none",color: "black" }}>
          <li className="sidebarListItem">
            <HomeIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Home</span>
          </li>
        </Link>
          <li className="sidebarListItem">
            <RssFeed  className="sidebarIcon"/>
            <span className="sidebarItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon  className="sidebarIcon"/>
            <span className="sidebarItemText">Courses</span>
          </li>
          
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>

        <ul className="sidebarfriendList">

        {Users.map((user)=>(
          <CloseFriend key={user.id} user={user}/>
        ))} 
       

        </ul>
      </div>
     
      </div>
  )
}
