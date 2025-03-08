import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCdqs-9DaZEX8-8vNtCMDG6wPi4dVCrjWI",
//     authDomain: "personal-cloud-jussi.firebaseapp.com",
//     projectId: "personal-cloud-jussi",
//     storageBucket: "personal-cloud-jussi.appspot.com",
//     messagingSenderId: "207069732042",
//     appId: "1:207069732042:web:c36762f40697fe5257e833"
// };
const firebaseConfig = {
    apiKey: "AIzaSyA8R5cqglsJ0sWBNrY_5UILKr-Xxwqv1dQ",
    authDomain: "password-vault-vue.firebaseapp.com",
    projectId: "password-vault-vue",
    storageBucket: "password-vault-vue.firebasestorage.app",
    messagingSenderId: "473624851968",
    appId: "1:473624851968:web:1a197cafae49d150df8ae5"
  };

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
export const db = getFirestore()

// collection ref
export const colRef = collection(db, 'passwords')

export const auth = getAuth()