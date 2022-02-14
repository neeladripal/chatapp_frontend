import React, { useState, useEffect } from "react";
import ProfileHeader from "../common/profileHeader";
import userService from "../../services/userService";
import ChatCard from "../common/ChatCard";
import UserCard from "../common/UserCard";
import { contactList } from "../../services/mockContacts";

function SearchChats(props) {
  const { searchString, onSearchChange } = props;

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
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          placeholder="Search by name or email"
        />
      </div>
    </div>
  );
}

function ChatList(props) {
  const { onChatSelect, chats } = props;

  const privateChatToCard = (chat) => {
    const { receiver, messages } = chat;
    let contact = { subtitle: "", addn_info: "" };
    contact.avatar = receiver.profilePic;
    contact.name = receiver.name;
    if (messages.length > 0) {
      const message = messages[messages.length - 1];
      if ((message.type = "text")) {
        contact.subtitle = message.content;
      }
      contact.addn_info = message.addedOn;
    }
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

function SearchUserList(props) {
  const { onNewUserSelect, searchString, chats } = props;
  const [newUsers, setNewUsers] = useState([]);

  useEffect(async () => {
    if (searchString) {
      const { data: users } = await userService.search(searchString);
      setNewUsers(users);
    }
  }, [searchString]);

  return (
    <div className="chat-list">
      {newUsers.map((newUser) => (
        <UserCard
          key={newUser._id}
          user={newUser}
          onUserSelect={onNewUserSelect}
        />
      ))}
    </div>
  );
}

function SideBar(props) {
  const { user, chats, onProfileHeaderClick, onChatSelect, onNewUserSelect } =
    props;
  const [searchString, setSearchString] = useState("");

  const handleSearchStringChange = (key) => {
    try {
      key.trim();
      setSearchString(key);
    } catch (ex) {}
  };

  const handleNewUserSelect = (user) => {
    setSearchString("");
    onNewUserSelect(user);
  };

  return (
    <div className="sidebar">
      <ProfileHeader chat={user} onProfileHeaderClick={onProfileHeaderClick} />
      <SearchChats
        searchString={searchString}
        onSearchChange={handleSearchStringChange}
      />
      {searchString === "" ? (
        <ChatList onChatSelect={onChatSelect} chats={chats} />
      ) : (
        <SearchUserList
          chats={chats}
          searchString={searchString}
          onNewUserSelect={handleNewUserSelect}
        />
      )}
    </div>
  );
}

export default SideBar;
