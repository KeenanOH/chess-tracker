import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { FirestoreDatabaseContext } from "../context/FirestoreDatabaseContext.ts"
import { Player } from "../database/models/firestore/player.ts"
import {MatchContext} from "../context/MatchContext.ts"

export function useMatchPlayers() {
    
    const firestoreDatabase = useContext(FirestoreDatabaseContext)
    const { match} = useContext(MatchContext)

    const [homePlayers, setHomePlayers] = useState<Player[]>([])
    const [awayPlayers, setAwayPlayers] = useState<Player[]>([])

    useEffect(() => {
        if (!match) return
        
        firestoreDatabase.getPlayers(match.homeSchool.id)
            .then(players => setHomePlayers(players))
            .catch(error => toast.error((error as Error).message))

        firestoreDatabase.getPlayers(match.awaySchool.id)
            .then(players => setAwayPlayers(players))
            .catch(error => toast.error((error as Error).message))
    }, [firestoreDatabase, match])

    return { homePlayers, awayPlayers }
}
