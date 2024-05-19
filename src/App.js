import React, { useRef, useState } from 'react';
import './App.css';
import ChatMessage from './messageContainer'

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  function signIn() {
    const dummyUser = { uid: '123', photoURL: 'https://th.bing.com/th/id/R.54c3045a98293d8a20d680c012269bc3?rik=g1B%2b3uEdySI%2fPQ&pid=ImgRaw&r=0' };
    setUser(dummyUser); // Mock sign in
  }

  function signOut() {
    setUser(null); // Sign out
  }

  return (
    <div className="App">
      <header>
        <h1>💬 Service Desk Chatbot</h1>
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
      photoURL: false//user.photoURL
    };

    const newBotMessage = {
      text: formValue,
      createdAt: new Date(),
      uid: false,
      photoURL: "https://mir-s3-cdn-cf.behance.net/projects/404/a42236171852785.Y3JvcCwxMzEzLDEwMjcsMTQzLDg3.png",
      escalate: true,
      button: {"label": "Escalate"}
    };
    setMessages([...messages, newMessage, newBotMessage]);
      //ADDITION

    //setMessages([...messages, newBotMessage]);
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {/*messages.map((msg, index) => <ChatMessage key={index} message={msg} />)*/}
        {messages.map((msg, index) => <ChatMessage key={index} messages={[msg.text]} buttons={[msg.button]} avatar={msg.photoURL} isUser={msg.uid === false ? false : true}/>)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Skriv her" />
        <button type="submit" disabled={!formValue}>➤</button>
      </form>
    </>
  );
}

export default App;
