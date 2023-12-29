import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"

import { db } from "./firebase.ts"


export interface Board {
    id: string
    homePlayerId: string
    awayPlayerId: string
    number: number
    result: "home" | "away" | "draw" | ""
}

export async function getBoards(matchId: string): Promise<Board[]> {
    const querySnapshot = await getDocs(collection(db, "matches", matchId, "boards"))

    return querySnapshot.docs.map((doc) => {
        const { homePlayerId, awayPlayerId, number, result } = doc.data()
        return { id: doc.id, homePlayerId, awayPlayerId, number, result }
    })
}

export async function createBoard(matchId: string, homePlayerId: string, awayPlayerId: string, number: number, result: "home" | "away" | "draw" | "") {
    await addDoc(collection(db, "matches", matchId, "boards"), { homePlayerId, awayPlayerId, number, result })
}

export async function updateBoard(matchId: string, boardId: string, homePlayerId?: string, awayPlayerId?: string, result?: "home" | "away" | "draw" | "") {
    if (homePlayerId && awayPlayerId && result)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { homePlayerId, awayPlayerId, result })
    else if (homePlayerId && awayPlayerId)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { homePlayerId, awayPlayerId })
    else if (homePlayerId && result)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { homePlayerId, result })
    else if (awayPlayerId && result)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { awayPlayerId, result })
    else if (homePlayerId)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { homePlayerId })
    else if (awayPlayerId)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { awayPlayerId })
    else if (result)
        await updateDoc(doc(db, "matches", matchId, "boards", boardId), { result })
}

export async function deleteBoard(matchId: string, boardId: string) {
    await deleteDoc(doc(db, "matches", matchId, "boards", boardId))
}

