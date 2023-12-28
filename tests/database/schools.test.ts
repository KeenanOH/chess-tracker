import { createSchool, deleteSchool, getSchools } from "../../src/database/schools"


describe("Schools Tests", () => {

    test("Get Schools", async () => {
        const schools = await getSchools()
        const names = schools.map((school) => { return school.name })
        expect(names.includes("Hersey")).toBe(true)
    })

    test("Create School", async () => {
        await createSchool("Jujutsu High")

        const schools = await getSchools()
        const names = schools.map((school) => { return school.name })
        expect(names.includes("Jujutsu High")).toBe(true)
    })

    afterAll(async () => {
        let schools = await getSchools()
        const school = schools.find((school) => { return school.name === "Jujutsu High" })

        expect(school).toBeDefined()

        if (school) await deleteSchool(school.id)

        schools = await getSchools()
        const names = schools.map((school) => { return school.name })
        expect(names.includes("Jujutsu High")).toBeFalsy()
    })

})
