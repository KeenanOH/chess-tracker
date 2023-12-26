import { collection, getDocs } from "firebase/firestore"

import { db } from "./firebase.ts"
import {School} from "./models/school.ts";


export async function getSchools() {
    const schools: School[] = []
    const querySnapshot = await getDocs(collection(db, "schools"))

    querySnapshot.forEach((doc) => {
        const { name } = doc.data()
        schools.push({ id: doc.id, name })
    })

    return schools
}
