import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import firebaseAPI from '../firebaseAPI';
import Tweet from '../components/Tweet';

const Home = ({ user }) => {
  const [text, setText] = useState('');
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(getFirestore(), 'tweets')), (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTweets(newArray);
    });
  }, []);

  const onClickSignOut = () => firebaseAPI.signOut();
  const onChangeInputHandler = (event) => setText(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    firebaseAPI.addDoc('tweets', {
      value: text,
      createdAt: new Date(),
      creatorId: user.uid,
    });
  };

  return (
    <>
      <button onClick={onClickSignOut}>Sign Out</button>
      <hr />
      <h2>TWEET</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="write anything." name="text" value={text} onChange={onChangeInputHandler} />
        <input type="submit" value="save" style={submitStyle} />
      </form>
      <hr />
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} user={user} tweet={tweet} />
      ))}
    </>
  );
};

const submitStyle = {
  marginLeft: '10px',
};

export default Home;
