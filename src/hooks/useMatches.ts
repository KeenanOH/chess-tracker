import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"

import { AuthContext } from "../context/AuthContext.ts"
import { FirestoreDatabaseContext } from "../context/FirestoreDatabaseContext.ts"
import { Match } from "../database/models/firestore/match.ts"

export function useMatches(): [Match[], React.Dispatch<React.SetStateAction<Match[]>>] {

    const { user } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {
        if (!user.schoolId) return

        firestoreDatabase.getMatches({ schoolId: user.schoolId })
            .then(matches => setMatches(matches))
            .catch(error => toast.error((error as Error).message))
    }, [firestoreDatabase, user.schoolId])

    return [matches, setMatches]
}
