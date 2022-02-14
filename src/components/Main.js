import React, { useState, useEffect } from "react";
import "./Main.css";
import SideBar from "./sidebar/SideBar";
import Chat from "./chat/Chat";
import UserDetails from "./UserDetails";
import chatService from "../services/chatService";

function Main(props) {
  const { user } = props;
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(async () => {
    const { data: newChats } = await chatService.getChats();
    setChats(newChats.map((chat) => chatToViewMap(chat, user._id)));
  }, []);

  const chatToViewMap = (chat, selfId) => {
    const view = {};
    view._id = chat._id;
    for (let user of chat.users) {
      if (user._id !== selfId) view.receiver = user;
    }
    view.messages = chat.messages;
    view.type = chat.type;
    return view;
  };

  const handleProfileHeaderClick = () => {
    setSelectedChat(null);
  };

  const handleChatSelect = (chatId) => {
    const newChat = chats.find((chat) => chat._id === chatId);
    setSelectedChat(newChat);
  };

  const handleMessageSend = async (chatId, message) => {
    const { data: newMessage } = await chatService.sendMessage(message);
    const newChat = chats.find((chat) => chat._id === chatId);
    const index = chats.indexOf(newChat);
    const newChats = [...chats];
    newChat.messages = [...newChat.messages, newMessage];
    newChats[index] = newChat;
    setChats(newChats);
    setSelectedChat(newChat);
  };

  return (
    <div className="Main">
      <SideBar
        onProfileHeaderClick={handleProfileHeaderClick}
        onChatSelect={handleChatSelect}
        user={user}
        chats={chats}
      />
      {selectedChat ? (
        <Chat
          selectedChat={selectedChat}
          self={user}
          onMessageSend={handleMessageSend}
        />
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
}

export default Main;
