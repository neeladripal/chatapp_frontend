import React, { useState } from "react";
import Messages from "./Messages";
import ProfileHeader from "../common/profileHeader";
import Picker from "emoji-picker-react";
import { messageList } from "../../services/mockMessages";

function ChatBox(props) {
  const { chatId, onMessageSend } = props;
  const [messageText, setMessageText] = useState("");
  const [pickerVisible, togglePicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessageText(messageText + " " + emojiObject.emoji);
    togglePicker(false);
  };

  const handleMessageTextChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleMessageSend = (e) => {
    const message = {
      channelId: chatId,
      type: "text",
      content: messageText,
    };
    onMessageSend(chatId, message);
    setMessageText("");
  };

  return (
    <div className="chat-box">
      {pickerVisible && (
        <Picker
          pickerStyle={{ position: "absolute", bottom: "60px" }}
          onEmojiClick={onEmojiClick}
        />
      )}
      <div className="input-wrapper">
        <img
          src={process.env.PUBLIC_URL + "data.svg"}
          alt=""
          onClick={() => {
            togglePicker(!pickerVisible);
          }}
          className="icon in-chat-box"
        ></img>
        <img
          src={process.env.PUBLIC_URL + "image.svg"}
          alt=""
          className="icon in-chat-box"
        ></img>
        <input
          type="text"
          placeholder="Type a message"
          onChange={handleMessageTextChange}
          value={messageText}
          className="input-text"
        />
      </div>
      <img
        src={process.env.PUBLIC_URL + "send-icon.svg"}
        alt=""
        className="icon"
        onClick={handleMessageSend}
      ></img>
    </div>
  );
}

function Chat(props) {
  const { selectedChat, self, onMessageSend } = props;

  const PrivateChatToProfileHeader = (chat) => {
    return {
      avatar: chat.receiver.profilePic,
      name: chat.receiver.name,
    };
  };

  return (
    <div className="chat">
      <ProfileHeader chat={PrivateChatToProfileHeader(selectedChat)} />
      <Messages messageList={selectedChat.messages} selfId={self._id} />
      <ChatBox onMessageSend={onMessageSend} chatId={selectedChat._id} />
    </div>
  );
}

export default Chat;
