import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    or,
    QueryFieldFilterConstraint,
    and,
    Query,
    getDoc
} from "firebase/firestore"

import { db } from "./firebase.ts"
import { School } from "./schools.ts"
import {createBoards} from "./boards.ts";

export interface Match {
    id: string
    homeSchool: School
    awaySchool: School
    date: string
}

export async function getMatch(id: string): Promise<Match | undefined> {
    const document = await getDoc(doc(db, "matches", id))
    const data = document.data()

    if (!data) return
    const { homeSchool, awaySchool, date } = data
    return {
        id: document.id, homeSchool, awaySchool, date
    }
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

export async function createMatch(homeSchool: School, awaySchool: School, date: Date): Promise<Match> {
    const documentReference = await addDoc(collection(db, "matches"), {
        homeSchool,
        awaySchool,
        date: date.toISOString()
    })

    await createBoards(documentReference.id)

    return {
        id: documentReference.id,
        homeSchool,
        awaySchool,
        date: date.toISOString()
    }
}

export async function deleteMatch(id: string) {
    await deleteDoc(doc(db, "matches", id))
}
