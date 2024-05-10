import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  function signIn() {
    const dummyUser = { uid: '123', photoURL: 'https://api.adorable.io/avatars/285/abott.png' };
    setUser(dummyUser); // Mock sign in
  }

  function signOut() {
    setUser(null); // Sign out
  }

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        {user ? <button onClick={signOut} className="sign-out">Sign Out</button> : <button onClick={signIn} className="sign-in">Sign in with Google</button>}
      </header>

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
  const dummy = useRef();
  const [formValue, setFormValue] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      text: formValue,
      createdAt: new Date(),
      uid: user.uid,
      photoURL: user.photoURL
    };

    setMessages([...messages, newMessage]);
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </>
  );
}

function ChatMessage({ message }) {
  const { text, photoURL } = message;

  return (
    <div className={`message`}>
      <img src={photoURL} alt="Avatar" />
      <p>{text}</p>
    </div>
  );
}

export default App;
