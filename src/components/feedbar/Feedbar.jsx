import { useContext, useEffect, useState } from "react";
import "../feedbar/Feedbar.css";
import Post from "../postss/Post";
import Share from "../share/Share";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext";
import { serverUrl } from "../../utils/appConstants";

export default function Feedbar({username}) {
const  [posts, setPosts] = useState([]);
// const { user } = useContext(AuthContext);
const user = JSON.parse(localStorage.getItem('loginUser'))

useEffect(() => {

  const fetchPosts = async () => {
    const res = username 
    ? await axios.get(`${serverUrl}/api/posts/profile/` + username) 
    : await axios.get(`${serverUrl}/api/posts/timeline/` + user?._id)
      console.log(username , "usernsme");
      setPosts(res.data.sort((p1,p2)=>{
      return new Date(p2.createdAt) -  new Date(p1.createdAt)
    }))
    console.log(res.data, "response>.....>>>>>>>>>>>>>>>>>>>>>>>>>");
  }
  fetchPosts()
},[username , user?._id])

  return (
    <div className="feed">
      <div className="feedwrapper">
      {(!username || username ===user?.username )&& <Share />}
        {posts.map((post) => (
  <Post key={post._id} post={post} />
))}
      </div>
    </div>
  );
}




