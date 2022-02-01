import React, { useState } from "react";
import Messages from "./Messages";
import ProfileHeader from "../common/profileHeader";
import Picker from "emoji-picker-react";
import { messageList } from "../../services/mockMessages";

function ChatBox(props) {
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
    setMessageText(e.target.value);
    props.onMessageSend(messageText);
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
      <img
        src={process.env.PUBLIC_URL + "data.svg"}
        alt=""
        onClick={() => {
          togglePicker(!pickerVisible);
        }}
        className="emoji"
      ></img>
      <div className="input-wrapper">
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
        className="send"
        onClick={handleMessageSend}
      ></img>
    </div>
  );
}

function Chat(props) {
  const { selectedChat } = props;
  const [messages, setMessages] = useState(messageList);

  const onMessageSend = (messageText) => {
    const message = {
      id: messages.length + 1,
      messageType: "TEXT",
      text: messageText,
      senderID: 1,
      addedOn: "12:00 PM",
    };
    setMessages([...messages, message]);
  };

  return (
    <div className="chat">
      <ProfileHeader contact={selectedChat} />
      <Messages messageList={messages} />
      <ChatBox onMessageSend={onMessageSend} />
    </div>
  );
}

export default Chat;
