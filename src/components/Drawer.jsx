import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Users } from "../dummyData.js";
import CloseFriend from "../components/CloseFriend/CloseFriend.jsx";
import Menu from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const iconList = [
  { icon: <HomeIcon />, name: "Home", route: "/" },
  { icon: <RssFeedIcon />, name: "Feed"},
  { icon: <ChatIcon />, name: "Chats" },
  { icon: <PlayCircleIcon />, name: "Videos" },
  { icon: <GroupIcon />, name: "Groups" },
  { icon: <BookmarkIcon />, name: "Bookmarks" },
  { icon: <HelpOutlineIcon />, name: "Questions" },
  { icon: <WorkOutlineIcon />, name: "Jobs" },
  { icon: <EventIcon />, name: "Events"},
  { icon: <SchoolIcon />, name: "Courses"},
];

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {iconList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.route}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List style={{ padding: "10px" }}>
        {Users.map((user) => (
          <CloseFriend key={user.id} user={user} />
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <Menu style={{ color: "white" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
