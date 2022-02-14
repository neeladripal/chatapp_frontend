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

  const handleNewUserSelect = (user) => {
    const chatExisting = chats.find((chat) => chat.receiver._id === user._id);
    if (chatExisting) setSelectedChat(chatExisting);
    else {
      setSelectedChat({
        _id: null,
        receiver: user,
        messages: [],
        type: "private",
      });
    }
  };

  const handleChatSelect = (chatId) => {
    const newChat = chats.find((chat) => chat._id === chatId);
    setSelectedChat(newChat);
  };

  const handleMessageSend = async (message) => {
    const oldChats = chats;
    const oldSelectedChat = selectedChat;
    try {
      const chatId = selectedChat._id;
      if (chatId) {
        message.channelId = chatId;
        const { data: newMessage } = await chatService.sendMessage(message);
        const newChat = chats.find((chat) => chat._id === chatId);
        const index = chats.indexOf(newChat);
        const newChats = [...chats];
        newChat.messages = [...newChat.messages, newMessage];
        newChats[index] = newChat;
        setChats(newChats);
        setSelectedChat(newChat);
      } else {
        const receiver = selectedChat.receiver;
        const { data: newChat } = await chatService.createChat([
          user.email,
          receiver.email,
        ]);
        message.channelId = newChat._id;
        const { data: newMessage } = await chatService.sendMessage(message);
        newChat.receiver = receiver;
        delete newChat.users;
        newChat.messages = [newMessage];
        const newChats = [...chats, newChat];
        setChats(newChats);
        setSelectedChat(newChat);
      }
    } catch (ex) {
      setChats(oldChats);
      setSelectedChat(oldSelectedChat);
    }
  };

  return (
    <div className="Main">
      <SideBar
        onProfileHeaderClick={handleProfileHeaderClick}
        onChatSelect={handleChatSelect}
        onNewUserSelect={handleNewUserSelect}
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
