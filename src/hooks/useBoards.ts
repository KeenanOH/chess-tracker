import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { MatchContext } from "../context/MatchContext.ts"
import { Board } from "../database/models/firestore/board.ts"
import { FirestoreDatabaseContext } from "../context/FirestoreDatabaseContext.ts"

export function useBoards(): [Board[], React.Dispatch<React.SetStateAction<Board[]>>] {
    
    const { match } = useContext(MatchContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        if (!match) return
        
        firestoreDatabase.getBoards(match.id)
            .then(boards => setBoards(boards))
            .catch(error => toast.error((error as Error).message))
    }, [firestoreDatabase, match])

    return [boards, setBoards]
}
