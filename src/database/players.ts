import {collection, doc, getDocs, addDoc, deleteDoc, updateDoc} from "firebase/firestore"

import { db } from "./firebase.ts"

export interface Player {
    id: string
    firstName: string
    lastName: string
}

export async function getPlayers(schoolId: string): Promise<Player[]> {
    const querySnapshot = await getDocs(collection(db, "schools", schoolId, "players"))

    return querySnapshot.docs.map((doc) => {
        const { firstName, lastName } = doc.data()
        return { id: doc.id, firstName, lastName }
    })
}

export async function createPlayer(schoolId: string, firstName: string, lastName: string): Promise<Player> {
    const documentReference = await addDoc(collection(db, "schools", schoolId, "players"), {
        firstName, lastName
    })

    return { id: documentReference.id, firstName, lastName }
}

export async function updatePlayer(schoolId: string, playerId: string, firstName: string, lastName: string) {
    await updateDoc(doc(db, "schools", schoolId, "players", playerId), {
        firstName, lastName
    })
}

export async function deletePlayer(schoolId: string, playerId: string) {
    await deleteDoc(doc(db, "schools", schoolId, "players", playerId))
}

export async function deletePlayers(schoolId: string) {
    const players = await getPlayers(schoolId)
    players.map(async (player) => {
        await deletePlayer(schoolId, player.id)
    })
}
