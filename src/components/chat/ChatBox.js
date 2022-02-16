import React, { useState } from "react";
import Picker from "emoji-picker-react";

function ChatBox(props) {
  const { onMessageSend } = props;
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
    if (messageText !== "") {
      const message = {
        type: "text",
        content: messageText,
      };
      onMessageSend(message);
      setMessageText("");
    }
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

export default ChatBox;
