// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeZwRxUwk8mxDEK7ElFAm_LhNAd_Iy5W0",
  authDomain: "tv-maze-bovolenta.firebaseapp.com",
  projectId: "tv-maze-bovolenta",
  storageBucket: "tv-maze-bovolenta.appspot.com",
  messagingSenderId: "1090544608033",
  appId: "1:1090544608033:web:eac3700f2ee0fc760f9460"
};

/* var firebase = require('firebase');
var firebaseui = require('firebaseui');

export var ui = new firebaseui.auth.AuthUI(firebase.auth()); */

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
