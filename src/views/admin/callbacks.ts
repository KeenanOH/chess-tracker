import React from "react"
import { NavigateFunction } from "react-router-dom"

import { Match } from "../../database/models/firestore/match.ts"

export function navigateToAdminMatchView(
    match: Match,
    setMatch: React.Dispatch<React.SetStateAction<Match | undefined>>,
    navigate: NavigateFunction
) {
    setMatch(match)
    navigate(`/admin/matches/${match.id}`)
}
