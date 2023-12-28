import { collection, doc, getDocs, addDoc, deleteDoc } from "firebase/firestore"

import { db } from "./firebase.ts"
import { deletePlayers } from "./players.ts"


export interface School {
    id: string
    name: string
}

export async function getSchools(): Promise<School[]> {
    const querySnapshot = await getDocs(collection(db, "schools"))

    return querySnapshot.docs.map((doc) => {
        const { name } = doc.data()
        return { id: doc.id, name }
    })
}

export async function createSchool(name: string) {
    await addDoc(collection(db, "schools"), {
        name
    })
}

export async function deleteSchool(id: string) {
    await deleteDoc(doc(db, "schools", id))
    await deletePlayers(id)
}
