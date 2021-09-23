import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(false)

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target
    if (name === 'email') setEmail(value)
    else setPassword(value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="email" placeholder="E-mail" value={email} onChange={onChangeInputHandler} required />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={onChangeInputHandler}
        required
      />
      <input type="submit" value="Log In" />
    </form>
  )
}
export default Auth
