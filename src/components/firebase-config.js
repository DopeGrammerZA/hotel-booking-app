import firebase from 'firebase/app';
import 'firebase/auth'; import { auth } from './firebase-config';


const firebaseConfig = {
    apiKey: "AIzaSyAHewqGLqW2jD8aSWqiAXNculpIhq84rn0",
    authDomain: "hotelapp-32f40.firebaseapp.com",
    projectId: "hotelapp-32f40",
    storageBucket: "hotelapp-32f40.appspot.com",
    messagingSenderId: "611692061019",
    appId: "1:611692061019:web:bc876acec8647c152d3a7e",
    measurementId: "G-MFNEZCNWMK"
  };


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export { auth };
