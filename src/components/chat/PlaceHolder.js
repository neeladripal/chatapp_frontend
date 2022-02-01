import React from "react";

function Placeholder() {
  return (
    <div className="placeholder">
      <img
        className="placeholder-image"
        alt="WELCOME TO CHATAPP"
        src={process.env.PUBLIC_URL + "welcome-placeholder.jpeg"}
      />
      <span>Keep your phone connected</span>
      ChatApp connects to your phone to sync messages.
    </div>
  );
}

export default Placeholder;
