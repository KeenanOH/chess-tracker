import { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"

import { FirestoreDatabaseContext } from "../context/FirestoreDatabaseContext.ts"
import { School } from "../database/models/firestore/school.ts"

export function useSchools() {

    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [schools, setSchools] = useState<School[]>([])

    useEffect(() => {
        firestoreDatabase.getSchools()
            .then(schools => setSchools(schools))
            .catch(error => toast.error((error as Error).message))
    }, [firestoreDatabase])

    return schools
}
