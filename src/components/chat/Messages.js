import React from "react";

function Message(props) {
  const { message, selfId } = props;
  return (
    <div
      style={{
        "--justify-content": `${
          message.sender === selfId ? "flex-end" : "flex-start"
        }`,
      }}
      className="message-wrapper"
    >
      <div
        style={{
          "--background": `${message.sender === selfId ? "#daf8cb" : "white"}`,
        }}
        className="message-text"
      >
        {message.content}
      </div>
    </div>
  );
}

function Messages(props) {
  const { messageList, selfId } = props;
  return (
    <div className="message-area">
      {messageList.map((message) => (
        <Message key={message._id} message={message} selfId={selfId} />
      ))}
    </div>
  );
}

export default Messages;
