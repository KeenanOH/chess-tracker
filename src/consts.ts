import { FirestoreDatabase } from "./database/firestoreDatabase.ts"
import { firestore } from "./database/firebaseConsts.ts"

export const firestoreDatabase = new FirestoreDatabase(firestore)
