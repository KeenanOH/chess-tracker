import { toast } from "react-toastify"

import { Match } from "../../database/models/firestore/match.ts"
import { Board } from "../../database/models/firestore/board.ts"
import { RealtimeDatabase } from "../../database/realtimeDatabase.ts"

export function publishMatch(realtimeDatabase: RealtimeDatabase, labelId: string | undefined, match: Match, boards: Board[]) {
    if (!labelId) return

    realtimeDatabase.createResult(labelId, match, boards)
        .then(() => toast.success("Successfully published results"))
        .catch(error => toast.error((error as Error).message))
}
