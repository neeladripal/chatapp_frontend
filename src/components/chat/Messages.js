import React, { createRef, useEffect } from "react";

function Message(props) {
  const { type, message, selfId } = props;

  const getSenderText = (type, name) => {
    if (type !== "private") return <strong>{name + ": "}</strong>;
    else return "";
  };

  return (
    <div
      style={{
        "--justify-content": `${
          message.sender._id === selfId ? "flex-end" : "flex-start"
        }`,
      }}
      className="message-wrapper"
    >
      <div
        style={{
          "--background": `${
            message.sender._id === selfId ? "#daf8cb" : "white"
          }`,
        }}
        className="message-content"
      >
        {message.sender._id !== selfId &&
          getSenderText(type, message.sender.name)}
        {message.type === "text" ? (
          message.content
        ) : (
          <img src={message.content} alt="" />
        )}
      </div>
    </div>
  );
}

function Messages(props) {
  const { type, messageList, selfId } = props;
  const messagesEnd = createRef();

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom());
  return (
    <div className="message-area">
      {messageList.map((message) => (
        <Message
          key={message._id}
          type={type}
          message={message}
          selfId={selfId}
        />
      ))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
    </div>
  );
}

export default Messages;
