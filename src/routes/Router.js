import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from 'pages/Home'
import Auth from 'pages/Auth'

const Router = ({ user }) => {
  return (
    <BrowserRouter>
      <Switch>
        {user ? (
          <Route exact path="/">
            <Home user={user} />
          </Route>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
