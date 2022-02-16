import React, { useState, useEffect } from "react";
import "./Main.css";
import SideBar from "./sidebar/SideBar";
import Chat from "./chat/Chat";
import UserDetails from "./UserDetails";
import chatService from "../services/chatService";
import socket from "../services/socket";

function Main(props) {
  const { user } = props;
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    function initSocket(userId) {
      socket.auth = { userId };
      socket.connect();
      socket.on("connect_error", (err) => {
        console.log(err.message);
      });
    }

    async function fetchChannels() {
      const { data: newChats } = await chatService.getChats();
      setChats(newChats);
    }

    initSocket(user._id);
    fetchChannels();

    return () => {
      socket.off("connect_error");
    };
  }, [user._id]);

  const handleProfileHeaderClick = () => {
    setSelectedChat(null);
  };

  const handleNewUserSelect = (user) => {
    const chatExisting = chats.find((chat) => chat.users[0]._id === user._id);
    if (chatExisting) setSelectedChat(chatExisting);
    else {
      setSelectedChat({
        _id: null,
        users: [user],
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
    try {
      const chatId = selectedChat._id;
      if (chatId) {
        message.channelId = chatId;
      } else {
        const receiver = selectedChat.users[0];
        const { data: newChat } = await chatService.createChat([
          user.email,
          receiver.email,
        ]);
        message.channelId = newChat._id;
      }
      message.senderName = selectedChat.users[0].name;
      socket.emit("private_message", { body: message }, (err) =>
        console.log(err)
      );
    } catch (ex) {
      if (ex.response) console.log(ex.response.data);
    }
  };

  useEffect(() => {
    socket.on("private_message", async ({ body, from }) => {
      let tempChats;
      setChats((chats) => {
        tempChats = chats;
        return chats;
      });
      const index = tempChats.findIndex((chat) => chat._id === from);
      let newChat;
      let newChats;
      if (index === -1) {
        try {
          const { data } = await chatService.getChat(from);
          newChat = data;
          newChats = [newChat, ...tempChats];
        } catch (ex) {
          if (ex.response) console.log(ex.response.data);
        }
      } else {
        newChats = [...tempChats];
        newChat = newChats[index];
        newChat.messages = [...newChat.messages, body];
      }
      setChats(newChats);

      setSelectedChat((selectedChat) => {
        if (
          selectedChat &&
          ((selectedChat._id && selectedChat._id === from) ||
            selectedChat.users[0]._id === newChat.users[0]._id)
        )
          return newChat;
        else return selectedChat;
      });
    });

    return () => {
      socket.off("private_message");
    };
  }, []);

  return (
    <div className="Main">
      <SideBar
        onProfileHeaderClick={handleProfileHeaderClick}
        onChatSelect={handleChatSelect}
        onNewUserSelect={handleNewUserSelect}
        self={user}
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
