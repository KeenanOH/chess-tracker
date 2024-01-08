import React, { useContext, useEffect, useState } from "react"

import { RealtimeDatabaseContext } from "../context/RealtimeDatabaseContext.ts"
import { Label } from "../database/models/realtime/label.ts"

export function useLabels(): [Label[], React.Dispatch<React.SetStateAction<Label[]>>] {

    const realtimeDatabase = useContext(RealtimeDatabaseContext)

    const [labels, setLabels] = useState<Label[]>([])

    useEffect(() => {
        realtimeDatabase.getLabels()
            .then(labels => setLabels(labels))
    }, [realtimeDatabase])

    return [labels, setLabels]
}
