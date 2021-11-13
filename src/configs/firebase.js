import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged,signOut } from "firebase/auth";
import { getFirestore , doc, setDoc, getDoc, addDoc, collection, getDocs, query,where ,onSnapshot,updateDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseApp = initializeApp({

  apiKey: "AIzaSyBSwl6lBO-QGagnOpCdt1txv3R8_qkEVEE",
  authDomain: "food-delivery-111222111.firebaseapp.com",
  projectId: "food-delivery-111222111",
  storageBucket: "food-delivery-111222111.appspot.com",
  messagingSenderId: "209127131983",
  appId: "1:209127131983:web:55aaee082dc63c5dc3533a",
  measurementId: "G-MFVQDBWEHR"
});

 

const auth = getAuth();
const db = getFirestore();

export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    
    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    onSnapshot,
    getStorage, 
    updateDoc,
    
}