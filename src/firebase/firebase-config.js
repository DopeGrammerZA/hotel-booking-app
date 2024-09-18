import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


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
const storage = getStorage(app);


export const fetchRoomsFromFirebase = async () => {
  const accommodationsCollection = collection(db, 'accommodations'); 
  const accommodationsSnapshot = await getDocs(accommodationsCollection); 
  const accommodationsList = accommodationsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })); 
  return accommodationsList; 
};

export { db, auth, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, storage, app };
