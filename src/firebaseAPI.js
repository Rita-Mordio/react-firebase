import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
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
  auth: getAuth(),
  db: getFirestore(),
  createUserWithEmailAndPassword: async (email, password) => {
    return await createUserWithEmailAndPassword(firebaseAPI.auth, email, password)
  },
  signInWithEmailAndPassword: async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAPI.auth, email, password)
  },
  signInWithGoogle: async () => {
    return await signInWithPopup(firebaseAPI.auth, new GoogleAuthProvider()).then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user
      return user
    })
  },
  signOut: () => {
    firebaseAPI.auth.signOut()
  },
  addDoc: async (collectionName, data) => {
    return await addDoc(collection(firebaseAPI.db, collectionName), data)
  },
  getDoc: async (collectionName) => {
    return await getDocs(collection(firebaseAPI.db, collectionName))
  },
}

export default firebaseAPI
