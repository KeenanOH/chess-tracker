import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"

import { AuthContext } from "../context/AuthContext.ts"
import { FirestoreDatabaseContext } from "../context/FirestoreDatabaseContext.ts"
import { Player } from "../database/models/firestore/player.ts"

export function usePlayers(): [Player[], React.Dispatch<React.SetStateAction<Player[]>>] {

    const { user } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        if (!user.schoolId) return

        firestoreDatabase.getPlayers(user.schoolId)
            .then(players => setPlayers(players))
            .catch(error => toast.error((error as Error).message))
    }, [firestoreDatabase, user.schoolId])

    return [players, setPlayers]
}
