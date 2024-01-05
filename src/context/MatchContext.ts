import React, { createContext } from "react"

import { Match } from "../database/models/firestore/match.ts"

interface IMatchContext {
    match: Match | undefined
    setMatch: React.Dispatch<React.SetStateAction<Match | undefined>>
}

export const MatchContext = createContext<IMatchContext>({
    match: undefined,
    setMatch: () => {}
})
