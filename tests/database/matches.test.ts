import { getMatches } from "../../src/database/matches"


describe("Matches Tests", () => {

    test("Get Matches", async () => {
        const matches = await getMatches()
        const matchIds = matches.map((match) => { return match.id })
        expect(matchIds).toContain("8A8xI4oLsLivRLpYIHL9")
    })

})
