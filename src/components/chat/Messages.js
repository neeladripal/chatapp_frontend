import React from "react";

function Message(props) {
  const { message } = props;
  return (
    <div
      style={{
        "--justify-content": `${
          message.senderID === 1 ? "flex-end" : "flex-start"
        }`,
      }}
      className="message-wrapper"
    >
      <div
        style={{
          "--background": `${message.senderID === 1 ? "#daf8cb" : "white"}`,
        }}
        className="message-text"
      >
        {message.text}
      </div>
    </div>
  );
}

function Messages(props) {
  return (
    <div className="message-area">
      {props.messageList.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
