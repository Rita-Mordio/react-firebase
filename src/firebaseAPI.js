import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

initializeApp(firebaseConfig)

const firebaseAPI = {
  getAuth: getAuth(),
  createUserWithEmailAndPassword: async (email, password) => {
    return await createUserWithEmailAndPassword(firebaseAPI.getAuth, email, password)
  },
  signInWithEmailAndPassword: async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAPI.getAuth, email, password)
  },
  signInWithGoogle: async () => {
    return await signInWithPopup(firebaseAPI.getAuth, new GoogleAuthProvider()).then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user
      return user
    })
  },
}

export default firebaseAPI
