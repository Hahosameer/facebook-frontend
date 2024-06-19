import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import likepng from "../../../public/assets/like.png";
import heart from "../../../public/assets/heart.png";
import { AuthContext } from "../context/AuthContext";
import { serverUrl } from "../../utils/appConstants";
import person11 from "../../../public/assets/person/11.jpeg";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import SmsIcon from '@mui/icons-material/Sms';
import RepeatIcon from '@mui/icons-material/Repeat';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function Post({ post }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [currentUser?._id, post.likes]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${serverUrl}/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  const likeHandle = () => {
    try {
      axios.put(`${serverUrl}/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={ user.profilePicture
                  ?  user.profilePicture: person11}
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postdate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postbottomLeft">
            <img
              className="likeIcon"
              src={likepng} // Check if this path is correct
              alt=""
            />
            <img
              className="likeIcon"
              src={heart} // Check if this path is correct
              alt=""
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postbottomRight">
            <span className="postcommentText">{post.comment} Comments</span>
          </div>
        </div>
        <div className="SocialActions">
          <button onClick={likeHandle} className={`likeButton ${animate ? 'animate' : ''}`}>
            {isLiked ? (
              <ThumbUpIcon sx={{ color: 'black' }} /> // Black colored like icon
            ) : (
              <ThumbUpOffAltIcon /> // Default like icon
            )}
            <span>Like</span>
          </button>
          <button>
            <SmsIcon />
            <span>Comments</span>
          </button>
          <button>
            <RepeatIcon />
            <span>Repost</span>
          </button>
          <button>
            <SendIcon />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
