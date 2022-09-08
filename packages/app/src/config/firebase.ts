import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBx0FZL5DG3gq6BemjbBZKl7kUkLnP8NW0',
  authDomain: 'notifica-ufba.firebaseapp.com',
  projectId: 'notifica-ufba',
  storageBucket: 'notifica-ufba.appspot.com',
  messagingSenderId: '533671864205',
  appId: '1:533671864205:web:11260085687422008d3fc4',
  measurementId: 'G-PPWW8RVZ0K',
}

const app = initializeApp(firebaseConfig)

const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export { app, db }
