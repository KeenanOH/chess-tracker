import { createPlayer, deletePlayer, getPlayers } from "../../src/database/players"


describe("Players Tests", () => {

    test("Get Players", async () => {
        const players = await getPlayers("lezb3nv0do3Oy7ad7t7u")
        const firstNames = players.map((player) => { return player.firstName })
        expect(firstNames.includes("Keenan")).toBe(true)
    })

    test("Create Player", async () => {
        await createPlayer("lezb3nv0do3Oy7ad7t7u", "Kento", "Nanami")

        const players = await getPlayers("lezb3nv0do3Oy7ad7t7u")
        const lastNames = players.map((player) => { return player.lastName })
        expect(lastNames.includes("Nanami")).toBe(true)
    })

    afterAll(async () => {
        let players = await getPlayers("lezb3nv0do3Oy7ad7t7u")
        const player = players.find((player) => { return player.lastName === "Nanami" })

        expect(player).toBeDefined()

        if (player) await deletePlayer("lezb3nv0do3Oy7ad7t7u", player.id)

        players = await getPlayers("lezb3nv0do3Oy7ad7t7u")
        const lastNames = players.map((player) => { return player.lastName })
        expect(lastNames.includes("Nanami")).toBeFalsy()
    })

})
