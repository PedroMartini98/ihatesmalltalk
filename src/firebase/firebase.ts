// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ21DW5ycsJHI50D5oEarJoveqi_nHT58",
  authDomain: "ihatesmalltalk-df75e.firebaseapp.com",
  projectId: "ihatesmalltalk-df75e",
  storageBucket: "ihatesmalltalk-df75e.appspot.com",
  messagingSenderId: "329208995570",
  appId: "1:329208995570:web:469f3e2840729de0b1fa6b",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const dbq = getFirestore(app);

export { dbq };
