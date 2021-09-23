import React, { useEffect, useState } from 'react'
import Router from 'routes/Router'
import firebaseAPI from './firebaseAPI'

function App() {
  const [initFirebase, setInitFirebase] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAPI.getAuth.currentUser)

  useEffect(() => {
    firebaseAPI.getAuth.onAuthStateChanged((user) => {
      if (user) setIsLoggedIn(true)
      else setIsLoggedIn(false)

      setInitFirebase(true)
    })
  }, [])

  return <>{initFirebase ? <Router isLoggedIn={isLoggedIn} /> : 'Initializing....'}</>
}

export default App
