import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CancelIcon from "@mui/icons-material/Cancel";
import person1 from "../../../public/assets/person/1.jpeg";
import { useContext, useRef, useState } from "react";
import person11 from "../../../public/assets/person/11.jpeg";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "../../utils/appConstants";

export default function Share() {
  // const { user } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post(`${serverUrl}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post(`${serverUrl}/api/posts`, newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(file, "file name ma kiya a raha ha  ");

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`profile/${user.username}`}>
            <img
              className="shareProfileImg"
              src={user?.profilePicture ? PF + user?.profilePicture : person11}
              alt=""
            />
          </Link>

          <input
            placeholder={"What's in your mind " + user?.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo /Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
