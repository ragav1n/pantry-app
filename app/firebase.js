// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt50BrKpu364FS_XFdPX2i1DZSs3RjfI8",
  authDomain: "pantryapp-6969.firebaseapp.com",
  projectId: "pantryapp-6969",
  storageBucket: "pantryapp-6969.appspot.com",
  messagingSenderId: "1005416832414",
  appId: "1:1005416832414:web:ded07bb3762895a3d84a8f",
  measurementId: "G-4PX1TYHHNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
const database = getDatabase(app);
const auth = getAuth(app);

export{app, auth, firestore, database}