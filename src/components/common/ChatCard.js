import React from "react";

function ChatCard(props) {
  const { chat, onChatSelect, _id } = props;
  const { name, avatar, subtitle, addn_info } = chat;
  return (
    <div className="chat-card" onClick={() => onChatSelect(_id)}>
      <img src={avatar} alt="" className="avatar" />
      <div className="info">
        <span className="name">{name}</span>
        <span className="subtitle">{subtitle}</span>
      </div>
      <span className="addn-info">{addn_info}</span>
    </div>
  );
}

export default ChatCard;
