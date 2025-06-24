// improt the function you need form the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// configuration
const firebaseCofig = {
    // code 
    apiKey: "AIzaSyCSkXsxTqfMqMxp9RrrGgjCV4JrXVd6oCk",
    authDomain: "new-app-16703.firebaseapp.com",
    projectId: "new-app-16703",
    storageBucket: "new-app-16703.firebasestorage.app",
    messagingSenderId: "300994767629",
    appId: "1:300994767629:web:1b8404e31a776515ebde44",
    measurementId: "G-ZFXCENCNV1"
}


// inilize Firebase

const app = initializeApp(firebaseCofig)
export const db = getFirestore(app)