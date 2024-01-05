import { createContext } from "react"
import { RealtimeDatabase } from "../database/realtimeDatabase.ts"
import { database } from "../database/firebaseConsts.ts"

export const RealtimeDatabaseContext = createContext(new RealtimeDatabase(database))
