import React, { useState } from "react";
import "./Main.css";
import SideBar from "./sidebar/SideBar";
import Chat from "./chat/Chat";
import Placeholder from "./chat/PlaceHolder";

function Main() {
  const [selectedChat, setChat] = useState();
  return (
    <div className="Main">
      <SideBar setChat={setChat} />
      {selectedChat ? <Chat selectedChat={selectedChat} /> : <Placeholder />}
    </div>
  );
}

export default Main;
