import "./online.css"
export default function OnLine({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER ;
  return (
    <li className="rightbarFriend">
        <div className="rightbarPrifileImgContainer">
          <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{user.username}</span>
      </li>
  )
}
