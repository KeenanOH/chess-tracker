import React from "react"
import { NavigateFunction } from "react-router-dom"

import { Player } from "../../database/models/firestore/player.ts"
import { toast } from "react-toastify"
import { User } from "../../database/models/firestore/user.ts"
import { FirestoreDatabase } from "../../database/firestoreDatabase.ts"
import { Match } from "../../database/models/firestore/match.ts"


export async function handlePlayerDeletion(
    firestoreDatabase: FirestoreDatabase,
    user: User,
    players: Player[],
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
) {
    if (!user.schoolId) return

    firestoreDatabase.deletePlayers(user.schoolId, players)
        .then(() => {
            setPlayers(allPlayers => {
                return allPlayers.filter(player => !players.includes(player))
            })

            toast.success("Deleted selected player(s)")
        })
        .catch(error => toast.error((error as Error).message))
}

export function openPlayersModal(
    setPlayerModalInitialValue: React.Dispatch<React.SetStateAction<Player | undefined>>,
    setPlayerModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    player?: Player
) {
    if (!player) {
        setPlayerModalInitialValue(undefined)
        setPlayerModalIsOpen(true)
    }

    setPlayerModalInitialValue(player)
    setPlayerModalIsOpen(true)
}

export function navigateToMatchView(
    match: Match,
    setMatch: React.Dispatch<React.SetStateAction<Match | undefined>>,
    navigate: NavigateFunction
) {
    setMatch(match)
    navigate(`/matches/${match.id}`)
}
