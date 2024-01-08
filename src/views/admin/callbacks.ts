import React from "react"
import { toast } from "react-toastify"
import { NavigateFunction } from "react-router-dom"

import { Match } from "../../database/models/firestore/match.ts"
import { RealtimeDatabase } from "../../database/realtimeDatabase.ts"
import {Label} from "../../database/models/realtime/label.ts";

export function navigateToAdminMatchView(
    match: Match,
    setMatch: React.Dispatch<React.SetStateAction<Match | undefined>>,
    navigate: NavigateFunction
) {
    setMatch(match)
    navigate(`/admin/matches/${match.id}`)
}

export function createLabel(
    name: string,
    realtimeDatabase: RealtimeDatabase,
    setLabels: React.Dispatch<React.SetStateAction<Label[]>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (name == "") return

    realtimeDatabase.createLabel(name)
        .then(label => {
            setLabels(labels => labels.concat(label))
            setIsOpen(false)
            toast.success("Created label")
        })
        .catch(error => toast.error((error as Error).message))
}
