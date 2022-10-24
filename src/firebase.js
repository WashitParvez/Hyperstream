import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwvTdRkvgnA1KSJTGtg6chik82Cges7oQ",
    authDomain: "hyperstream-build.firebaseapp.com",
    projectId: "hyperstream-build",
    storageBucket: "hyperstream-build.appspot.com",
    messagingSenderId: "690604010515",
    appId: "1:690604010515:web:f33e9e21697f691c0ca3e6"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const db = firebase.firestore();