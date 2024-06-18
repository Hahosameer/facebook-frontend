import "./closeFriend.css"


const PF = import.meta.env.VITE_PUBLIC_FOLDER ;
export default function closeFriend({user}) {
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg" src={user?.profilePicture} alt="" />
    <span className="sidebarFriendName">{user.username}</span>
  </li>
  )
}
