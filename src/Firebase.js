import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAmEdMe6bW1di6C5cJrBErcUxsEr70hmIQ",
  authDomain: "secquraise-project.firebaseapp.com",
  projectId: "secquraise-project",
  storageBucket: "secquraise-project.appspot.com",
  messagingSenderId: "524884795235",
  appId: "1:524884795235:web:54e41b25ae01d41b60fd56",
  measurementId: "G-LES91VHXLF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
