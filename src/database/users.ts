import { doc, getDoc } from "firebase/firestore"

import { School } from "./schools.ts"
import { db } from "./firebase.ts"

export interface User {
    id: string
    school: School
    isAdmin: boolean
}

export async function getUser(id: string): Promise<User | null> {
    const documentSnapshot = await getDoc(doc(db, "users", id))
    const data = documentSnapshot.data()

    if (!data) return null

    const { school, isAdmin } = data
    return {
        id: documentSnapshot.id,
        school,
        isAdmin
    }
}
