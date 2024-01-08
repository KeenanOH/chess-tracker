import * as fs from "fs"
import { beforeAll, afterAll } from "vitest"
import { initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing"

import { FirestoreDatabase } from "../src/database/firestoreDatabase"

export const adminUserId = "6dYye4e96LV5rEoycwuX"
export const regularUserId = "lmtRznZY4EMHxFiw5hKS"
export const firstSchoolId = "AR0lmLnMRHIFWozUHuF7"
export const secondSchoolId = "k7CaDaG0CXgZ7ARWS3yP"
export const firstSchoolPlayerId = "JYR5JHQD3UEjzTouNIhC"
export const secondSchoolPlayerId = "UhokocJBvZ6qGGauNtgm"
export const matchId = "0CwIiYUjj3OajJBAL8L3"
export const boardId = "vQvxxHwtOa0EHNyemodG"

let testEnv: RulesTestEnvironment

export let unauthenticatedFirestore: FirestoreDatabase
export let authenticatedFirestore: FirestoreDatabase
export let adminFirestore: FirestoreDatabase

// TODO - fix typing issues with firebase SDK V10 / V9 -> look on GH for issues or make one
beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: "chess-tracker-react",
        firestore: {
            rules: fs.readFileSync("firestore.rules", "utf8")
        }
    })

    const unauthenticatedContext = testEnv.unauthenticatedContext()
    const authenticatedContext = testEnv.authenticatedContext(regularUserId)
    const adminContext = testEnv.authenticatedContext(adminUserId)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unauthenticatedFirestore = new FirestoreDatabase(unauthenticatedContext.firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    authenticatedFirestore = new FirestoreDatabase(authenticatedContext.firestore())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adminFirestore = new FirestoreDatabase(adminContext.firestore())
})

afterAll(async () => {
    await testEnv.cleanup()
})
