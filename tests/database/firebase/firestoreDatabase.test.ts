import { assertFails } from "@firebase/rules-unit-testing"

import { unauthenticatedDb } from "../../setup"

describe("Schools Tests", () => {

    it("should not allow a read for an unauthenticated context", async () => {
        await assertFails(unauthenticatedDb.getSchools())
    })


})

describe("Players Tests", () => {

    it("should not allow a read for an unauthenticated context", async () => {
        await assertFails(unauthenticatedDb.getPlayers("lezb3nv0do3Oy7ad7t7u"))
    })

})

describe("Matches Tests", () => {

    it("should not allow a read for an unauthenticated context", async () => {
        await assertFails(unauthenticatedDb.getMatches({ }))
    })

})

describe("Boards Tests", () => {

    it("should not allow a read for an unauthenticated context", async () => {
        await assertFails(unauthenticatedDb.getBoards("gvvs00PTkbkDYuEauIxQ"))
    })

})
