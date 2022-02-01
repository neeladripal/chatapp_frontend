import React from "react";
import { contactList } from "../../services/mockContacts";

function Contact(props) {
  const { user, setChat } = props;
  const { name, profilePic, lastText, lastTextTime } = user;
  return (
    <div className="contact-card" onClick={() => setChat(user)}>
      <img
        src={process.env.PUBLIC_URL + profilePic}
        alt=""
        className="avatar"
      />
      <div className="info">
        <span className="name">{name}</span>
        <span className="last-message">{lastText}</span>
      </div>
      <span className="message-time">{lastTextTime}</span>
    </div>
  );
}

function Contacts(props) {
  const { setChat } = props;
  return (
    <div className="contact-list">
      {contactList.map((user) => (
        <Contact key={user.id} user={user} setChat={setChat} />
      ))}
    </div>
  );
}

export default Contacts;
