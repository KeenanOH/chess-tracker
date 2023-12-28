import { collection, DocumentReference, getDocs } from "firebase/firestore"

import { db } from "./firebase.ts"

export interface Match {
    id: string
    homeSchool: DocumentReference
    awaySchool: DocumentReference
}

export async function getMatches(): Promise<Match[]> {
    const querySnapshot = await getDocs(collection(db, "matches"))

    return querySnapshot.docs.map((doc) => {
        const { homeSchool, awaySchool } = doc.data()
        return { id: doc.id, homeSchool, awaySchool }
    })
}
