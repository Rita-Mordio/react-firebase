import React from "react";
import firebaseAPI from "../firebaseAPI";

const Home = () => {

  const onClickSignOut = () => {
    firebaseAPI.getAuth.signOut()
  }

  return (
    <>
      <span>Home</span>
      <button onClick={onClickSignOut}>Sign Out</button>
    </>
  )
}
export default Home
