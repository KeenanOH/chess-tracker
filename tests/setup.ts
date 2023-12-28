import { signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "../src/database/firebase"

beforeAll(async () => {
    await signInWithEmailAndPassword(auth, process.env["email"]!, process.env["password"]!)
})

afterAll(async () => {
    await auth.signOut()
})
