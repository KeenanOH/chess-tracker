import * as fs from "fs"
import { initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing"
import { FirestoreDatabase } from "../src/database/firestoreDatabase"

let testEnv: RulesTestEnvironment
export let unauthenticatedDb : FirestoreDatabase
export let authenticatedDb: FirestoreDatabase
export let adminDb: FirestoreDatabase

beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: "chess-tracker-react",
        firestore: {
            rules: fs.readFileSync("firestore.rules", "utf8")
        }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unauthenticatedDb = new FirestoreDatabase(testEnv.unauthenticatedContext().firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    authenticatedDb = new FirestoreDatabase(testEnv.authenticatedContext("YgInYpnBfkRGQBWYcjnwIXvf14R2").firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adminDb = new FirestoreDatabase(testEnv.authenticatedContext("KaJwq9qtikbytIDWzwGdkNGTo6i1").firestore())
})

afterAll(async () => {
    await testEnv.cleanup()
})
