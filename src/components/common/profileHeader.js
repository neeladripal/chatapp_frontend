import React from "react";

function ProfileHeader(props) {
  const { contact } = props;
  return (
    <div className="profile-header">
      <div className="info">
        <img
          src={process.env.PUBLIC_URL + contact.profilePic}
          alt=""
          className="avatar"
        />
        <span className="name">{contact.name}</span>
      </div>
    </div>
  );
}

export default ProfileHeader;
