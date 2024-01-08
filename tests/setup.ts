import * as fs from "fs"
import { beforeAll, afterAll } from "vitest"
import { initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { FirestoreDatabase } from "../src/database/firestoreDatabase"
import { RealtimeDatabase } from "../src/database/realtimeDatabase"

let testEnv: RulesTestEnvironment
export let unauthenticatedFirestore: FirestoreDatabase
export let authenticatedFirestore: FirestoreDatabase
export let adminFirestore: FirestoreDatabase
export let unauthenticatedDatabase: RealtimeDatabase
export let authenticatedDatabase: RealtimeDatabase
export let adminDatabase: RealtimeDatabase

// TODO - fix typing issues with firebase SDK V10 / V9
beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: "chess-tracker-react",
        firestore: {
            rules: fs.readFileSync("firestore.rules", "utf8")
        }
    })

    const unauthenticatedContext = testEnv.unauthenticatedContext()
    const authenticatedContext = testEnv.authenticatedContext("YgInYpnBfkRGQBWYcjnwIXvf14R2")
    const adminContext = testEnv.authenticatedContext("KaJwq9qtikbytIDWzwGdkNGTo6i1")

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unauthenticatedFirestore = new FirestoreDatabase(unauthenticatedContext.firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    authenticatedFirestore = new FirestoreDatabase(authenticatedContext.firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adminFirestore = new FirestoreDatabase(adminContext.firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unauthenticatedDatabase = new RealtimeDatabase(unauthenticatedContext.database())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    authenticatedDatabase = new RealtimeDatabase(authenticatedContext.database())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adminDatabase = new RealtimeDatabase(adminContext.database())
})

afterAll(async () => {
    await testEnv.cleanup()
})
