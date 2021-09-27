import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import firebaseAPI from '../firebaseAPI';

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
        <input type="submit" value="save" style={{ marginLeft: '10px' }} />
      </form>
      <hr />
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <span style={{ marginRight: '10px' }}>{tweet.value}</span>
          <span>{tweet.createdAt.toDate().toString()}</span>
        </div>
      ))}
    </>
  );
};
export default Home;
