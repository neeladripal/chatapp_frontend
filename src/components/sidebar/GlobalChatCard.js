import React from "react";
import ChatCard from "../common/ChatCard";

function GlobalChatCard(props) {
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

export default GlobalChatCard;
