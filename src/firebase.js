import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCD280etWIe6H87cR2pg2y5E7Bq_LJ0waA",
  authDomain: "quotes-a4962.firebaseapp.com",
  projectId: "quotes-a4962",
  storageBucket: "quotes-a4962.appspot.com",
  messagingSenderId: "177171553697",
  appId: "1:177171553697:web:bc56f6b874f9affc423fe0",
  measurementId: "G-SCG4BFTNGJ"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
auth.languageCode = 'it';
export const provider = new GoogleAuthProvider();
export const db = getFirestore();

