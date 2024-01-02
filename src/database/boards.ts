import { writeBatch, collection, doc, getDocs, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore"

import { db } from "./firebase.ts"
import { Player } from "./players.ts"


export interface Board {
    id: string
    homePlayer: Player
    awayPlayer: Player
    number: number
    result: "home" | "away" | "draw" | ""
}

export async function getBoards(matchId: string): Promise<Board[]> {
    const querySnapshot = await getDocs(query(collection(db, "matches", matchId, "boards"), orderBy("number", "asc")))

    return querySnapshot.docs.map((doc) => {
        const { homePlayer, awayPlayer, number, result } = doc.data()
        return { id: doc.id, homePlayer, awayPlayer, number, result }
    })
}

// export async function createBoard(matchId: string, homePlayerId: string, awayPlayerId: string, number: number, result: "home" | "away" | "draw" | "") {
//     await addDoc(collection(db, "matches", matchId, "boards"), { homePlayerId, awayPlayerId, number, result })
// }

export async function createBoards(matchId: string) {
    const batch = writeBatch(db)

    for (let i = 1; i <= 8; i++) {
        batch.set(
            doc(collection(db, "matches", matchId, "boards")),
            {
                number: i,
                result: "",
                homePlayer: {},
                awayPlayer: {}
            }
        )
    }

    await batch.commit()
}

export async function updateBoard(matchId: string, boardId: string, homePlayer: Player, awayPlayer: Player, result: "home" | "away" | "draw" | "") {
    await updateDoc(doc(db, "matches", matchId, "boards", boardId), {
        homePlayer, awayPlayer, result
    })
}

export async function deleteBoard(matchId: string, boardId: string) {
    await deleteDoc(doc(db, "matches", matchId, "boards", boardId))
}

