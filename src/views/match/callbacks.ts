import { toast } from "react-toastify"

import { Match } from "../../database/models/firestore/match.ts"
import { Board } from "../../database/models/firestore/board.ts"
import { RealtimeDatabase } from "../../database/realtimeDatabase.ts"
import { FirestoreDatabase } from "../../database/firestoreDatabase.ts"

export function publishMatch(firestoreDatabase: FirestoreDatabase, realtimeDatabase: RealtimeDatabase, labelId: string | undefined, match: Match, boards: Board[]) {
    if (!labelId) return

    const callback = async () => {
        await firestoreDatabase.deleteMatch(match.id)
        await realtimeDatabase.createResult(labelId, match, boards)
    }

    callback()
        .then(() => toast.success("Published results"))
        .catch(error => toast.error((error as Error).message))
}
