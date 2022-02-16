import React from "react";
import ChatCard from "../common/ChatCard";

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

export default ChatList;
