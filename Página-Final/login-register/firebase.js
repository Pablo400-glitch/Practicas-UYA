import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { addDoc, getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ4EK9cDvyU9gIY_MauxS-Mos8CjIN96M",
  authDomain: "practica-final-uya.firebaseapp.com",
  projectId: "practica-final-uya",
  storageBucket: "practica-final-uya.appspot.com",
  messagingSenderId: "30585017351",
  appId: "1:30585017351:web:1a1707ff514bc72536c6a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveUser = (user, password) => addDoc(collection(db, 'users'), {user, password});

export const getUser = () => getDocs(collection(db, 'users'))