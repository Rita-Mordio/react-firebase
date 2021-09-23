import React, { useState } from 'react'
import Router from 'routes/Router'
import { authService } from 'firebaseAPI'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)

  return <Router isLoggedIn={isLoggedIn} />
}

export default App
