import { FirestoreDatabase } from "./database/firestoreDatabase.ts"
import { RealtimeDatabase } from "./database/realtimeDatabase.ts"
import { database, firestore } from "./database/firebaseConsts.ts"

export const firestoreDatabase = new FirestoreDatabase(firestore)
export const realtimeDatabase = new RealtimeDatabase(database)
