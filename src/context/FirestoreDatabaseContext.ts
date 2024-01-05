import { createContext } from "react";
import { FirestoreDatabase } from "../database/firestoreDatabase.ts"
import { firestore } from "../database/firebaseConsts.ts"

export const FirestoreDatabaseContext = createContext(new FirestoreDatabase(firestore))
