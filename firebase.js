// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsEsiF0TcEzP5P5qhv1RNhwSDyf7JJJDw",
  authDomain: "priceportal-6b696.firebaseapp.com",
  projectId: "priceportal-6b696",
  storageBucket: "priceportal-6b696.appspot.com",
  messagingSenderId: "140832161969",
  appId: "1:140832161969:web:131f8ee0f420a27b39a290"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth();

export { auth, storage };