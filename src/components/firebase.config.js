// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6ZQAjSyAGqpjGILhLKNUOlZN3eWwF6DQ",
  authDomain: "cars-e-commerce-ec9e8.firebaseapp.com",
  projectId: "cars-e-commerce-ec9e8",
  storageBucket: "cars-e-commerce-ec9e8.appspot.com",
  messagingSenderId: "348280593745",
  appId: "1:348280593745:web:dc7618e2155e7726ae4770",
  measurementId: "G-C0D0KLX2ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

