import React from "react"
import { toast } from "react-toastify"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential,
    signInWithRedirect,
    getRedirectResult
} from "firebase/auth"

import { auth, googleAuthProvider } from "../../database/firebaseConsts.ts"
import { User } from "../../database/models/firestore/user.ts"
import { FirestoreDatabase } from "../../database/firestoreDatabase.ts"

async function handleUserCredentials(
    firestoreDatabase: FirestoreDatabase,
    userCredential: UserCredential,
    setUser: React.Dispatch<React.SetStateAction<User>>,
) {
    setUser(await firestoreDatabase.getUser(userCredential.user.uid))
}

export async function handleLoginFormSubmit(
    firestoreDatabase: FirestoreDatabase,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    email: string,
    password: string
) {
    try {
        await handleUserCredentials(
            firestoreDatabase,
            await signInWithEmailAndPassword(auth, email, password),
            setUser
        )
    } catch (error) {
        toast.error((error as Error).message)
    }
}

export async function handleRegistrationFormSubmit(
    firestoreDatabase: FirestoreDatabase,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    email: string,
    password: string,
    confirmPassword: string
) {
    if (password != confirmPassword) {
        toast.error("Passwords do not match")
        return
    }

    try {
        await handleUserCredentials(
            firestoreDatabase,
            await createUserWithEmailAndPassword(auth, email, password),
            setUser
        )
    } catch (error) {
        toast.error((error as Error).message)
    }
}

export async function handleGoogleSignIn(
    firestoreDatabase: FirestoreDatabase,
    setUser: React.Dispatch<React.SetStateAction<User>>
) {
    try {
        await signInWithRedirect(auth, googleAuthProvider)
        const userCredentials = await getRedirectResult(auth)

        if (userCredentials)
            await handleUserCredentials(firestoreDatabase, userCredentials, setUser)
    } catch (error) {
        toast.error((error as Error).message)
    }
}
