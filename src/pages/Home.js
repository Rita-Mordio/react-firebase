import React, { useEffect, useState } from 'react'
import firebaseAPI from '../firebaseAPI'

const Home = () => {
  const [text, setText] = useState('')
  const [tweets, setTweets] = useState([])

  const getTweets = async () => {
    const result = await firebaseAPI.getDoc('tweets')
    result.forEach((item) => {
      const newItem = {
        id: item.id,
        ...item.data(),
      }
      setTweets((prev) => [newItem, ...prev])
    })
  }

  useEffect(() => {
    getTweets()
  }, [])

  const onClickSignOut = () => firebaseAPI.signOut()
  const onChangeInputHandler = (event) => setText(event.target.value)

  const onSubmit = async (event) => {
    event.preventDefault()
    const resultId = await firebaseAPI.addDoc('tweets', {
      value: text,
      createdAt: new Date(),
    })

    console.log('resultId : ', resultId)
  }

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
  )
}
export default Home
