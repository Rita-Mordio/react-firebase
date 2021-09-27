import React, { useEffect, useState } from 'react'
import Router from 'routes/Router'
import firebaseAPI from './firebaseAPI'

function App() {
  const [initFirebase, setInitFirebase] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebaseAPI.auth.onAuthStateChanged((user) => {
      if (user) setUser(user)
      else setUser(null)

      setInitFirebase(true)
    })
  }, [])

  return <>{initFirebase ? <Router user={user} /> : 'Initializing....'}</>
}

export default App
