import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from 'pages/Home'
import Auth from 'pages/Auth'

const Router = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn ? <Route exact path="/" component={Home} /> : <Route exact path="/" component={Auth} />}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
