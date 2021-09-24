import React, { useState } from 'react'
import firebaseAPI from '../firebaseAPI'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target
    if (name === 'email') setEmail(value)
    else if (name === 'password') setPassword(value)
    else setConfirmPassword(value)
  }

  const onToggleIsSignUp = () => {
    setIsSignUp(!isSignUp)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const onClickGoogleLogin = async () => {
    await firebaseAPI.signInWithGoogle()
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (isSignUp && password !== confirmPassword) return

    if (isSignUp) await firebaseAPI.createUserWithEmailAndPassword(email, password)
    else await firebaseAPI.signInWithEmailAndPassword(email, password)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={onChangeInputHandler}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={onChangeInputHandler}
          required
          style={{ marginRight: '10px' }}
        />
        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={onChangeInputHandler}
            required
            style={{ marginRight: '10px' }}
          />
        )}
        <input type="submit" value={isSignUp ? 'Sign Up' : 'Sign In'} />
      </form>
      <button onClick={onToggleIsSignUp} style={{ marginTop: '10px' }}>
        change form
      </button>
      <button onClick={onClickGoogleLogin} style={{ marginTop: '10px', marginLeft: '10px' }}>
        google login
      </button>
    </>
  )
}
export default Auth
