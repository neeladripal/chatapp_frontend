import React, { useState, useEffect } from "react";
import ProfileHeader from "../common/profileHeader";
import userService from "../../services/userService";
import ChatCard from "../common/ChatCard";
import UserCard from "../common/UserCard";

function GlobalChat(props) {
  const { globalChat, self, onChatSelect } = props;

  const globalChatToCard = ({ messages }, self) => {
    const globalChat = {
      avatar: "",
      name: "Global",
      lastMessage: "",
      lastMessageTime: "",
    };
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const senderText =
        lastMessage.sender._id === self._id
          ? "You: "
          : lastMessage.sender.name.split()[0] + ": ";
      globalChat.lastMessage =
        senderText +
        (lastMessage.type === "text" ? lastMessage.content : "Photo");
      globalChat.lastMessageTime = lastMessage.addedOn;
    }
    return globalChat;
  };

  return (
    <ChatCard
      key={globalChat._id}
      _id={globalChat._id}
      chat={globalChatToCard(globalChat, self)}
      onChatSelect={onChatSelect}
    />
  );
}

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
  const { onChatSelect, chats, self } = props;

  const privateChatToCard = (chat, self) => {
    const { users, messages } = chat;
    let contact = { lastMessage: "", lastMessageTime: "" };
    contact.avatar = users[0].profilePic;
    contact.name = users[0].name;
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const senderText = lastMessage.sender._id === self._id ? "You: " : "";
      if ((lastMessage.type = "text")) {
        contact.lastMessage = senderText + lastMessage.content;
      }
      contact.lastMessageTime = lastMessage.addedOn;
    }
    return contact;
  };

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatCard
          key={chat._id}
          _id={chat._id}
          chat={privateChatToCard(chat, self)}
          onChatSelect={onChatSelect}
        />
      ))}
    </div>
  );
}

function SearchUserList(props) {
  const { onNewUserSelect, searchString } = props;
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    async function searchUsers() {
      if (searchString !== "") {
        const { data: users } = await userService.search(searchString);
        setNewUsers(users);
      }
    }
    searchUsers();
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
  const {
    self,
    chats,
    globalChat,
    onProfileHeaderClick,
    onChatSelect,
    onNewUserSelect,
  } = props;
  const [searchString, setSearchString] = useState("");

  const handleSearchStringChange = (key) => {
    setSearchString(key);
  };

  const handleNewUserSelect = (user) => {
    setSearchString("");
    onNewUserSelect(user);
  };

  return (
    <div className="sidebar">
      <ProfileHeader chat={self} onProfileHeaderClick={onProfileHeaderClick} />
      <GlobalChat
        onChatSelect={onChatSelect}
        globalChat={globalChat}
        self={self}
      />
      <SearchChats
        searchString={searchString}
        onSearchChange={handleSearchStringChange}
      />
      {searchString.trim() === "" ? (
        <ChatList onChatSelect={onChatSelect} chats={chats} self={self} />
      ) : (
        <SearchUserList
          searchString={searchString}
          onNewUserSelect={handleNewUserSelect}
        />
      )}
    </div>
  );
}

export default SideBar;
