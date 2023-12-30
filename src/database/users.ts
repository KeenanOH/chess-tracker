import { doc, getDoc, setDoc } from "firebase/firestore"

import { db } from "./firebase.ts"

export interface User {
    id: string
    schoolId?: string
    isAdmin?: boolean
}

export async function getUser(id: string): Promise<User> {
    const documentSnapshot = await getDoc(doc(db, "users", id))
    const data = documentSnapshot.data()

    if (!data) return {
        id: id
    }

    const { schoolId, isAdmin } = data
    return {
        id: documentSnapshot.id,
        schoolId,
        isAdmin
    }
}

export async function createUser(id: string, schoolId: string) {
    await setDoc(doc(db, "users", id), {
        schoolId: schoolId,
        isAdmin: false
    })
}
