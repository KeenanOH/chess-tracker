import {createMatch, deleteMatch, getMatches} from "../../src/database/matches"


describe("Matches Tests", () => {

    test("Get Matches", async () => {
        const matches = await getMatches({ schoolId: "lezb3nv0do3Oy7ad7t7u" })
        const matchIds = matches.map((match) => { return match.id })
        expect(matchIds).toContain("8A8xI4oLsLivRLpYIHL9")
    })

    test("Create Match", async () => {
        await createMatch("lezb3nv0do3Oy7ad7t7u", "sPfURW3wBUvtLnUBp10J", new Date())

        const matches = await getMatches({})
        expect(matches.length).toBeGreaterThan(1)
    })

    afterAll(async () => {
        let matches = await getMatches({})
        const match = matches.find((match) => { return match.id != "8A8xI4oLsLivRLpYIHL9" })

        expect(match).toBeDefined()

        if (match) await deleteMatch(match.id)
        else throw new Error()

        matches = await getMatches({})
        const matchIds = matches.map((match) => { return match.id })
        expect(matchIds.includes(match.id)).toBeFalsy()
    })

})
