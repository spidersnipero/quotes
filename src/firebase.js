import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
auth.languageCode = 'it';
export const provider = new GoogleAuthProvider();
export const db = getFirestore();

