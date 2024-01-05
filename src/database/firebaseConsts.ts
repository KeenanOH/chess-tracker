import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"

export const realtimeDatabaseURL = "https://chess-tracker-react-default-rtdb.firebaseio.com/"
const firebaseConfig = {
    apiKey: "AIzaSyBgyDw_Sw43pLQmG2r9kYqkmCeVcWXoi-Y",
    authDomain: "chess-tracker-react.firebaseapp.com",
    projectId: "chess-tracker-react",
    storageBucket: "chess-tracker-react.appspot.com",
    messagingSenderId: "662324471293",
    appId: "1:662324471293:web:3d3df08db8281cb9312594",
    databaseURL: realtimeDatabaseURL
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()

export const firestore = getFirestore(app)
export const database = getDatabase(app)
