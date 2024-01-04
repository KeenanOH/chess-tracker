import {
    addDoc,
    and,
    collection,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    getDocs,
    or,
    orderBy,
    Query,
    query,
    QueryFieldFilterConstraint,
    setDoc,
    where,
    writeBatch,
    updateDoc
} from "firebase/firestore"

import { School } from "./models/school.ts"
import { Player } from "./models/player.ts"
import { Match } from "./models/match.ts"
import { Board } from "./models/board.ts"
import { User } from "./models/user.ts"

export class FirestoreDatabase {

    firestore: Firestore

    constructor(firestore: Firestore) {
        this.firestore = firestore
    }

    async getSchools(): Promise<School[]> {
        const querySnapshot = await getDocs(collection(this.firestore, "schools"))

        return querySnapshot.docs.map((doc) => {
            const { name } = doc.data()
            return { id: doc.id, name }
        })
    }

    async createSchool(name: string): Promise<School> {
        const documentReference = await addDoc(collection(this.firestore, "schools"), {
            name
        })

        return { id: documentReference.id, name }
    }

    async deleteSchool(id: string) {
        await deleteDoc(doc(this.firestore, "schools", id))
        await this.deletePlayers(id)
    }

    async getPlayers(schoolId: string): Promise<Player[]> {
        const querySnapshot = await getDocs(collection(this.firestore, "schools", schoolId, "players"))

        return querySnapshot.docs.map((doc) => {
            const { firstName, lastName } = doc.data()
            return { id: doc.id, firstName, lastName }
        })
    }

    async createPlayer(schoolId: string, firstName: string, lastName: string): Promise<Player> {
        const documentReference = await addDoc(collection(this.firestore, "schools", schoolId, "players"), {
            firstName, lastName
        })

        return { id: documentReference.id, firstName, lastName }
    }

    async updatePlayer(schoolId: string, playerId: string, firstName: string, lastName: string) {
        await setDoc(doc(this.firestore, "schools", schoolId, "players", playerId), {
            firstName, lastName
        })
    }

    async deletePlayer(schoolId: string, playerId: string) {
        await deleteDoc(doc(this.firestore, "schools", schoolId, "players", playerId))
    }

    async deletePlayers(schoolId: string, players?: Player[]) {
        if (!players)
            players = await this.getPlayers(schoolId)

        const batch = writeBatch(this.firestore)

        players.forEach(player => {
            batch.delete(doc(this.firestore, "schools", schoolId, "players", player.id))
        })

        await batch.commit()
    }

    async getMatch(id: string): Promise<Match | undefined> {
        const document = await getDoc(doc(this.firestore, "matches", id))
        const data = document.data()

        if (!data) return
        const { homeSchool, awaySchool, date } = data
        return {
            id: document.id, homeSchool, awaySchool, date
        }
    }

    async getMatches({ schoolId, date }: { schoolId?: string, date?: Date }): Promise<Match[]> {
        const queryConstraints: QueryFieldFilterConstraint[] = []

        if (date)
            queryConstraints.push(
                where("date", "==", date.toISOString())
            )

        let fireStoreQuery: Query
        const collectionReference = collection(this.firestore, "matches")

        if (schoolId)
            fireStoreQuery = query(collectionReference, and(or(where("homeSchool.id", "==", schoolId), where("awaySchool.id", "==", schoolId)), ...queryConstraints))
        else
            fireStoreQuery = query(collectionReference, ...queryConstraints)

        const querySnapshot = await getDocs(fireStoreQuery)

        return querySnapshot.docs.map((doc) => {
            const { homeSchool, awaySchool, date } = doc.data()
            return { id: doc.id, homeSchool, awaySchool, date }
        })
    }

    async createMatch(homeSchool: School, awaySchool: School, date: Date): Promise<Match> {
        const documentReference = await addDoc(collection(this.firestore, "matches"), {
            homeSchool,
            awaySchool,
            date: date.toISOString()
        })

        await this.createBoards(documentReference.id)

        return {
            id: documentReference.id,
            homeSchool,
            awaySchool,
            date: date.toISOString()
        }
    }

    async deleteMatch(id: string) {
        await deleteDoc(doc(this.firestore, "matches", id))
    }

    async getBoards(matchId: string): Promise<Board[]> {
        const querySnapshot = await getDocs(query(collection(this.firestore, "matches", matchId, "boards"), orderBy("number", "asc")))

        return querySnapshot.docs.map((doc) => {
            const { homePlayer, awayPlayer, number, result } = doc.data()
            return { id: doc.id, homePlayer, awayPlayer, number, result }
        })
    }

    async createBoard(matchId: string, number: number) {
        await addDoc(collection(this.firestore, "matches", matchId, "boards"), {
            number: number,
            result: "",
            homePlayer: {},
            awayPlayer: {}
        })
    }

    async createBoards(matchId: string) {
        const batch = writeBatch(this.firestore)

        for (let i = 1; i <= 8; i++) {
            batch.set(
                doc(collection(this.firestore, "matches", matchId, "boards")),
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

    async updateBoard(matchId: string, boardId: string, homePlayer: Player, awayPlayer: Player, result: "home" | "away" | "draw" | "") {
        await updateDoc(doc(this.firestore, "matches", matchId, "boards", boardId), {
            homePlayer, awayPlayer, result
        })
    }

    async deleteBoard(matchId: string, boardId: string) {
        await deleteDoc(doc(this.firestore, "matches", matchId, "boards", boardId))
    }

    async deleteBoards(matchId: string) {
        const boards = await this.getBoards(matchId)
        const batch = writeBatch(this.firestore)

        boards.forEach(board => {
            batch.delete(doc(this.firestore, "matches", matchId, "boards", board.id))
        })

        await batch.commit()
    }

    async getUser(id: string): Promise<User> {
        const documentSnapshot = await getDoc(doc(this.firestore, "users", id))
        const data = documentSnapshot.data()

        if (!data) return {
            id: id
        }

        const { schoolId, isAdmin } = data
        return {
            id: documentSnapshot.id,
            schoolId,
            isAdmin
        }
    }

    async updateOrCreateUser(id: string, schoolId: string) {
        return await setDoc(doc(this.firestore, "users", id), {
            schoolId: schoolId,
            isAdmin: false
        })
    }

}
