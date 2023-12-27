import { signInWithEmailAndPassword } from "firebase/auth"

import { getSchools } from "../src/database/database"
import { auth } from "../src/database/firebase"

describe("Database Tests", () => {

    beforeAll(async () => {
        await signInWithEmailAndPassword(auth, process.env["email"]!, process.env["password"]!)
    })

    test("schools database", async () => {

        const schools = await getSchools()
        console.log(schools)

    })

    afterAll(async () => {
        await auth.signOut()
    })

})
