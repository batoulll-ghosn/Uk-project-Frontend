// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtF23mcJ9LlNKfU_I6IXXapQ2mymmj120",
  authDomain: "sms-verification-7a5a4.firebaseapp.com",
  projectId: "sms-verification-7a5a4",
  storageBucket: "sms-verification-7a5a4.appspot.com",
  messagingSenderId: "187233393657",
  appId: "1:187233393657:web:fff7ab2ed0d84ccc93fb28",
  measurementId: "G-DG64Z7J8NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

