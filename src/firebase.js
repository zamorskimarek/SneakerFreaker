import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: "https://snkrfrkr-e6c5c-default-rtdb.europe-west1.firebasedatabase.app/",
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
    apiKey: "AIzaSyAliyjO-H1wnzuIvSqLiudMCyeW-gFGdrE",
    authDomain: "snkrfrkr-e6c5c.firebaseapp.com",
    databaseURL: "https://snkrfrkr-e6c5c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "snkrfrkr-e6c5c",
    storageBucket: "snkrfrkr-e6c5c.appspot.com",
    messagingSenderId: "803038404192",
    appId: "1:803038404192:web:66f0a8a8c0a17ad70fad05"
})

export const auth = app.auth()
export const database = getDatabase(app)
export default app