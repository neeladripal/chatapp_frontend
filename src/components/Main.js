import React, { useState } from "react";
import "./Main.css";
import SideBar from "./sidebar/SideBar";
import Chat from "./chat/Chat";
import UserDetails from "./chat/UserDetails";

function Main(props) {
  const [selectedChat, setChat] = useState();
  const { user } = props;
  return (
    <div className="Main">
      <SideBar setChat={setChat} user={user} />
      {selectedChat ? (
        <Chat selectedChat={selectedChat} />
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
}

export default Main;
