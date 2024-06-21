import "./App.css";
import { useState, useRef } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

firebase.initializeApp({
  apiKey: "AIzaSyAUJvUxhOJd8FUsIgbvcVaKQ_LSw-A1Uwo",
  authDomain: "superchat-92da3.firebaseapp.com",
  projectId: "superchat-92da3",
  storageBucket: "superchat-92da3.appspot.com",
  messagingSenderId: "652023673496",
  appId: "1:652023673496:web:f1e15a8c38f486c48856ed",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <SignOut /> : ""}

        <section>{user ? <ChatRoom /> : <SignIn />}</section>
      </header>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign In With Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async () => {
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");

    dummy.current.focus();
  };

  return (
    <ChatContainer
      style={{
        height: "500px",
      }}
    >
      <MessageList>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </MessageList>
      <MessageInput
        value={formValue}
        onChange={(val) => setFormValue(val)}
        onSend={sendMessage}
        placeholder="Type message here"
        attachButton={false}
      />
    </ChatContainer>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;

  const direction = uid === auth.currentUser.uid ? "outgoing" : "incoming";

  return (
    <>
      {direction === "incoming" ? (
        <Message
          model={{
            direction: { direction },
            position: "last",
            sender: "Joe",
            sentTime: { createdAt },
          }}
        >
          <Message.HtmlContent html={text} />
          <Avatar name="Joe" src={photoURL} />
        </Message>
      ) : (
        <Message
          model={{
            position: "last",
            sender: "Joe",
            sentTime: { createdAt },
          }}
        >
          <Message.HtmlContent html={text} />
          <Avatar name="Joe" src={photoURL} />
        </Message>
      )}
    </>
  );
}

export default App;
