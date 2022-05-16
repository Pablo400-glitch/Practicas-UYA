import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBcZi_JxzDVfa0aRsmmhQm57JZOrPXGIHQ",
  authDomain: "fabuloso-f83d7.firebaseapp.com",
  projectId: "fabuloso-f83d7",
  storageBucket: "fabuloso-f83d7.appspot.com",
  messagingSenderId: "576849027412",
  appId: "1:576849027412:web:1f0de31667b20ee45d28c1",
  measurementId: "G-J7JRJTSPX8"
});

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (user !== null) {
    console.log('Logged in!');
  } else {
    console.log('No user');
  }
});