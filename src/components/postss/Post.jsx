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
export default function Post({ post }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [currentUser?._id, post.like]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${serverUrl}/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  // console.log(user);
  const likeHandle = () => {
    try {
      axios.put(`${serverUrl}/api/posts/" + post._id + "/like`, {
        userId: currentUser._id,
      });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : "person/11.jpeg"
                }
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
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postbottomLeft">
            <img
              className="likeIcon"
              src={likepng} // Check if this path is correct
              onClick={likeHandle}
              alt=""
            />
            <img
              className="likeIcon"
              src={heart} // Check if this path is correct
              onClick={likeHandle}
              alt=""
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postbottomRight">
            <span className="postcommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
