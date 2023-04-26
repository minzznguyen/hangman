const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1fKYLdcHcBui5QQjVPNOktDYd5AQfi2o",
    authDomain: "hangman-16d87.firebaseapp.com",
    projectId: "hangman-16d87",
    storageBucket: "hangman-16d87.appspot.com",
    messagingSenderId: "629008964187",
    appId: "1:629008964187:web:6f5d7a062868e068247d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = db;
