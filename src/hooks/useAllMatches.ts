import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"

import { FirestoreDatabaseContext } from "../context/FirestoreDatabaseContext.ts"
import { Match } from "../database/models/firestore/match.ts"

export function useAllMatches(): [Match[], React.Dispatch<React.SetStateAction<Match[]>>] {

    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {
        firestoreDatabase.getMatches({ })
            .then(matches => setMatches(matches))
            .catch(error => toast.error((error as Error).message))
    }, [firestoreDatabase])

    return [matches, setMatches]
}
