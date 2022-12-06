// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeZwRxUwk8mxDEK7ElFAm_LhNAd_Iy5W0",
  authDomain: "tv-maze-bovolenta.firebaseapp.com",
  projectId: "tv-maze-bovolenta",
  storageBucket: "tv-maze-bovolenta.appspot.com",
  messagingSenderId: "1090544608033",
  appId: "1:1090544608033:web:eac3700f2ee0fc760f9460",
  databaseURL:
    "https://tv-maze-bovolenta-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new firebase.auth.GoogleAuthProvider();
export const database = getDatabase(app);
