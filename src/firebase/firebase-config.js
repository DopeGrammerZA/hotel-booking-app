import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHewqGLqW2jD8aSWqiAXNculpIhq84rn0",
  authDomain: "hotelapp-32f40.firebaseapp.com",
  projectId: "hotelapp-32f40",
  storageBucket: "hotelapp-32f40.appspot.com",
  messagingSenderId: "611692061019",
  appId: "1:611692061019:web:bc876acec8647c152d3a7e",
  measurementId: "G-MFNEZCNWMK" 
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

  