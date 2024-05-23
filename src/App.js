import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import ChatMessage from './messageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faX, faEllipsisVertical, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Customizable variables for scrolling behavior
const scrollBehavior = 'smooth';
const scrollTimeout = 100; // Timeout for scroll to bottom after DOM updates (in milliseconds)

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  function signIn() {
    const dummyUser = { uid: '123', photoURL: 'logo.svg' };
    setUser(dummyUser); // Mock sign in
  }

  function signOut() {
    setUser(null); // Sign out
  }

  return (
    <div className="App">
      <nav>
        <h1 id="navbarheader">💬 Service Desk Chatbot</h1>
        <div className="nav-buttons">
          <button title="Options"><FontAwesomeIcon icon={faEllipsisVertical} /></button>
          <button title="About"><FontAwesomeIcon icon={faInfoCircle} /></button>
          <button onClick={user ? signOut : signIn}><FontAwesomeIcon icon={faRightToBracket} /></button>
          <button title="Close"><FontAwesomeIcon icon={faX} /></button>
        </div>
      </nav>

      <section>
        {user ? <ChatRoom messages={messages} setMessages={setMessages} user={user} /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  return (
    <p>Sign in to chat!</p>
  );
}

function ChatRoom({ messages, setMessages, user }) {
  const messageEl = useRef();
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    if (messageEl.current) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            setTimeout(() => {
              messageEl.current.scrollTo({ top: messageEl.current.scrollHeight, behavior: scrollBehavior });
            }, scrollTimeout);
          }
        });
      });

      observer.observe(messageEl.current, { childList: true, subtree: true });

      // Initial scroll to bottom if there are already messages present
      messageEl.current.scrollTo({ top: messageEl.current.scrollHeight, behavior: scrollBehavior });

      return () => {
        observer.disconnect();
      };
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      text: [formValue],
      createdAt: new Date(),
      uid: user.uid,
      photoURL: "https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png",
    };

    const newBotMessage = {
      text: [formValue, "Second message"],
      createdAt: new Date(),
      uid: false,
      photoURL: "https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png",
      escalate: true,
      buttons: [
        { "label": "Escalate to a service agent" },
        { "label": "Visit documentation" },
      ]
    };
    setMessages([...messages, newMessage, newBotMessage]);
    setFormValue('');
  };

  return (
    <>
      <main ref={messageEl}>
        {messages.map((msg, index) => <ChatMessage key={index} messages={msg.text} buttons={msg.buttons} avatar={msg.photoURL} isUser={msg.uid !== false} />)}
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here, avoid personal information" />
        <button type="submit" disabled={!formValue}>➤</button>
      </form>
    </>
  );
}

export default App;
