import React from "react";
import ProfileHeader from "../common/profileHeader";
import Contacts from "./Contacts";

function SearchChats() {
  return (
    <div className="search-box">
      <div className="input-wrapper">
        <img
          src={process.env.PUBLIC_URL + "search-icon.svg"}
          alt=""
          className="search-icon"
        />
        <input type="text" className="input-text" />
      </div>
    </div>
  );
}

function SideBar(props) {
  const { setChat } = props;
  const userProfile = {
    id: 0,
    name: "You",
    profilePic: "profile/avatar.png",
  };

  const handleProfileHeaderClick = () => {
    setChat(null);
  };

  return (
    <div className="sidebar">
      <ProfileHeader
        contact={userProfile}
        onProfileHeaderClick={handleProfileHeaderClick}
      />
      <SearchChats />
      <Contacts setChat={setChat} />
    </div>
  );
}

export default SideBar;
