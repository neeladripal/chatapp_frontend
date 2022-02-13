import React, { useState, useEffect } from "react";
import ProfileHeader from "../common/profileHeader";
import userService from "../../services/userService";
import ChatCard from "../common/ChatCard";
import { contactList } from "../../services/mockContacts";

function SearchChats() {
  const [searchString, setSearchString] = useState("");

  const handleChange = async (e) => {
    try {
      const key = e.target.value;
      setSearchString(key);
      if (key) {
        const response = await userService.search(key);
        console.log(response.data);
      }
    } catch (ex) {}
  };
  return (
    <div className="search-box">
      <div className="input-wrapper">
        <img
          src={process.env.PUBLIC_URL + "search-icon.svg"}
          alt=""
          className="search-icon"
        />
        <input
          type="text"
          className="input-text"
          value={searchString}
          onChange={handleChange}
          placeholder="Search by name or email"
        />
      </div>
    </div>
  );
}

function ChatList(props) {
  const { onChatSelect, chats } = props;
  console.log(chats);

  const privateChatToCard = (chat) => {
    const { receiver, messages } = chat;
    let contact = {};
    contact.avatar = receiver.profilePic;
    contact.name = receiver.name;
    const message = messages[messages.length - 1];
    if ((message.type = "text")) {
      contact.subtitle = message.content;
    }
    contact.addn_info = message.addedOn;
    return contact;
  };

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatCard
          key={chat._id}
          _id={chat._id}
          chat={privateChatToCard(chat)}
          onChatSelect={onChatSelect}
        />
      ))}
    </div>
  );
}

function SideBar(props) {
  const { user, chats, onProfileHeaderClick, onChatSelect } = props;

  return (
    <div className="sidebar">
      <ProfileHeader chat={user} onProfileHeaderClick={onProfileHeaderClick} />
      <SearchChats />
      <ChatList onChatSelect={onChatSelect} chats={chats} />
    </div>
  );
}

export default SideBar;
