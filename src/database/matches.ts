import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp, query, where, or, QueryFieldFilterConstraint, and, Query } from "firebase/firestore"

import { db } from "./firebase.ts"
import { School } from "./schools.ts"


export interface Match {
    id: string
    homeSchool: School
    awaySchool: School
    date: string
}

export async function getMatches({ schoolId, date }: { schoolId?: string, date?: Date }): Promise<Match[]> {
    const queryConstraints: QueryFieldFilterConstraint[] = []

    if (date)
        queryConstraints.push(
            where("date", "==", date.toISOString())
        )

    let fireStoreQuery: Query
    const collectionReference = collection(db, "matches")

    if (schoolId)
        fireStoreQuery = query(collectionReference, and(or(where("homeSchool.id", "==", schoolId), where("awaySchool.id", "==", schoolId)), ...queryConstraints))
    else
        fireStoreQuery = query(collectionReference, ...queryConstraints)

    const querySnapshot = await getDocs(fireStoreQuery)

    return querySnapshot.docs.map((doc) => {
        const { homeSchool, awaySchool, date } = doc.data()
        return { id: doc.id, homeSchool, awaySchool, date }
    })
}

export async function createMatch(homeSchoolId: string, awaySchoolId: string, date: Date) {
    await addDoc(collection(db, "matches"), {
        homeSchool: doc(db, "schools", homeSchoolId),
        awaySchool: doc(db, "schools", awaySchoolId),
        date: Timestamp.fromDate(date)
    })
}

export async function deleteMatch(id: string) {
    await deleteDoc(doc(db, "matches", id))
}
