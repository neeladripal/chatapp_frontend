import React from "react";

function UserDetails(props) {
  const { user } = props;
  return (
    <div className="placeholder">
      <img
        className="placeholder-image"
        alt="WELCOME TO CHATAPP"
        src={process.env.PUBLIC_URL + user.profilePic}
      />
      <span>{user.name}</span>
      {user.about}
    </div>
  );
}

export default UserDetails;
