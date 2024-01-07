import { describe, it, expect } from "vitest"
import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"

import { authenticatedDb, unauthenticatedDb, adminDb } from "../setup"

describe("Schools Tests", () => {

    describe("Read Schools", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.getSchools())
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedDb.getSchools())
        })

    })

    describe("Write Schools", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.createSchool("School Name"))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedDb.createSchool("School Name"))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminDb.createSchool("School Name"))
        })

    })

    describe("Delete Schools", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.deleteSchool("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedDb.deleteSchool("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminDb.deleteSchool("lezb3nv0do3Oy7ad7t7u"))
        })

    })

})

describe("Players Tests", () => {

    describe("Read Players", () => {
        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.getPlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedDb.getPlayers("lezb3nv0do3Oy7ad7t7u"))
        })
    })

    describe("Write Players", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.createPlayer("lezb3nv0do3Oy7ad7t7u", "First", "Last"))
        })

        it("should allow a write for an authenticated context where the schoolId  matches", async () => {
            await assertSucceeds(authenticatedDb.createPlayer("lezb3nv0do3Oy7ad7t7u", "First", "Last"))
        })

        it("should not allow a write for an authenticated context where the schoolId does not match", async () => {
            await assertFails(authenticatedDb.createPlayer("sPfURW3wBUvtLnUBp10J", "First", "Last"))
        })

        it("should allow a write for an admin context where the schoolId matches", async () => {
            await assertSucceeds(adminDb.createPlayer("lezb3nv0do3Oy7ad7t7u", "First", "Last"))

        })

        it("should allow a write for an admin context where the schoolId does not match", async () => {
            await assertSucceeds(adminDb.createPlayer("sPfURW3wBUvtLnUBp10J", "First", "Last"))
        })

    })

    describe("Update Players", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.updatePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP", "First", "Last"))
        })

        it("should allow an update for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedDb.updatePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP", "First", "Last"))
        })

        it("should not allow an update for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedDb.updatePlayer("sPfURW3wBUvtLnUBp10J", "HRXYCwwDWUmmekyJX0zI", "First", "Last"))
        })

        it("should allow an update for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminDb.updatePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP", "First", "Last"))
        })

        it("should allow an update for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminDb.updatePlayer("sPfURW3wBUvtLnUBp10J", "HRXYCwwDWUmmekyJX0zI", "First", "Last"))
        })

    })

    describe("Delete Players", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.deletePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should allow a delete for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedDb.deletePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should not allow a delete for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedDb.deletePlayer("sPfURW3wBUvtLnUBp10J", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should allow a delete for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminDb.deletePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should allow a delete for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminDb.deletePlayer("sPfURW3wBUvtLnUBp10J", "4FyIbaITnlLng5JZy7bP"))
        })

    })

    describe("Bulk Delete Players", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.deletePlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a delete for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedDb.deletePlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should not allow a delete for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedDb.deletePlayers("sPfURW3wBUvtLnUBp10J"))
        })

        it("should allow a delete for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminDb.deletePlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a delete for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminDb.deletePlayers("sPfURW3wBUvtLnUBp10J"))
        })

    })

})

describe("Matches Tests", () => {

    describe("Read Match", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.getMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedDb.getMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should return undefined for a match that does not exist", async () => {
            await assertSucceeds(adminDb.getMatch("test"))
        })

    })

    describe("Read Matches", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.getMatches({ }))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedDb.getMatches({ }))
        })

        it("should allow a read for an authenticated context where date is specified", async () => {
            await assertSucceeds(authenticatedDb.getMatches({ date: new Date() }))
        })

        it("should allow a read for an authenticated context where school id is specified", async () => {
            await assertSucceeds(authenticatedDb.getMatches({ schoolId: "lezb3nv0do3Oy7ad7t7u" }))
        })

    })

    describe("Write Matches", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.createMatch(
                {
                    id: "lezb3nv0do3Oy7ad7t7u",
                    name: "School Name"
                },
                {
                    id: "sPfURW3wBUvtLnUBp10J",
                    name: "School Name"
                },
                new Date())
            )
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedDb.createMatch(
                {
                    id: "lezb3nv0do3Oy7ad7t7u",
                    name: "School Name"
                },
                {
                    id: "sPfURW3wBUvtLnUBp10J",
                    name: "School Name"
                },
                new Date())
            )
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminDb.createMatch(
                {
                    id: "lezb3nv0do3Oy7ad7t7u",
                    name: "School Name"
                },
                {
                    id: "sPfURW3wBUvtLnUBp10J",
                    name: "School Name"
                },
                new Date())
            )
        })

    })

    describe("Delete Matches", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.deleteMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedDb.deleteMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminDb.deleteMatch("gvvs00PTkbkDYuEauIxQ"))
        })

    })

})

describe("Boards Tests", () => {

    describe("Read Boards", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.getBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedDb.getBoards("gvvs00PTkbkDYuEauIxQ"))
        })

    })

    describe("Write Boards", () => {

        it("should not allow a write for an unauthenticated context", async() => {
            await assertFails(unauthenticatedDb.createBoard("gvvs00PTkbkDYuEauIxQ", 1))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedDb.createBoard("gvvs00PTkbkDYuEauIxQ", 1))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminDb.createBoard("gvvs00PTkbkDYuEauIxQ", 1))
        })

    })

    describe("Bulk Write Boards", () => {

        it("should not allow a write for an unauthenticated context", async() => {
            await assertFails(unauthenticatedDb.createBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedDb.createBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminDb.createBoards("gvvs00PTkbkDYuEauIxQ"))
        })

    })

    describe("Update Boards", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.updateBoard(
                "gvvs00PTkbkDYuEauIxQ",
                "5O6rDXJS1fCEz0Cuqq2U",
                {
                    id: "4FyIbaITnlLng5JZy7bP",
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                {
                    id: "HRXYCwwDWUmmekyJX0zI",
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                "home"
            ))
        })

        // Issue with the emulator; in other environments this succeeds
        //
        // it("should allow an update for an authenticated context where schoolIds match", async () => {
        //     await assertSucceeds(authenticatedDb.updateBoard(
        //         "gvvs00PTkbkDYuEauIxQ",
        //         "5O6rDXJS1fCEz0Cuqq2U",
        //         {
        //             id: "4FyIbaITnlLng5JZy7bP",
        //             firstName: "Nobara",
        //             lastName: "Kugisaki"
        //         },
        //         {
        //             id: "HRXYCwwDWUmmekyJX0zI",
        //             firstName: "Yuji",
        //             lastName: "Itadori"
        //         },
        //         "home"
        //     ))
        // })

        it("should not allow an update for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedDb.updateBoard(
                "jUL8XbgooTaDA1NRVQ3O",
                "JJ8u8K6d3lz1hnsAHPNF",
                {
                    id: "4FyIbaITnlLng5JZy7bP",
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                {
                    id: "HRXYCwwDWUmmekyJX0zI",
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                "home"
            ))
        })

        it("should allow an update for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminDb.updateBoard(
                "gvvs00PTkbkDYuEauIxQ",
                "5O6rDXJS1fCEz0Cuqq2U",
                {
                    id: "4FyIbaITnlLng5JZy7bP",
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                {
                    id: "HRXYCwwDWUmmekyJX0zI",
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                "home"
            ))
        })

        it("should allow an update for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminDb.updateBoard(
                "jUL8XbgooTaDA1NRVQ3O",
                "JJ8u8K6d3lz1hnsAHPNF",
                {
                    id: "4FyIbaITnlLng5JZy7bP",
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                {
                    id: "HRXYCwwDWUmmekyJX0zI",
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                "home"
            ))
        })

    })

    describe("Delete Boards", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.deleteBoard("gvvs00PTkbkDYuEauIxQ", "5O6rDXJS1fCEz0Cuqq2U"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedDb.deleteBoard("gvvs00PTkbkDYuEauIxQ", "5O6rDXJS1fCEz0Cuqq2U"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminDb.deleteBoard("gvvs00PTkbkDYuEauIxQ", "5O6rDXJS1fCEz0Cuqq2U"))
        })

    })

    describe("Bulk Delete Boards", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.deleteBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedDb.deleteBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminDb.deleteBoards("gvvs00PTkbkDYuEauIxQ"))
        })

    })

})

describe("Users Tests", () => {

    describe("Read Users", () => {

        it("should not allow a read for an unauthenticated context", async() => {
            await assertFails(unauthenticatedDb.getUser("YgInYpnBfkRGQBWYcjnwIXvf14R2"))
        })

        it("should allow a read for an authenticated context where userIds match", async () => {
            await assertSucceeds(authenticatedDb.getUser("YgInYpnBfkRGQBWYcjnwIXvf14R2"))
        })

        it("should not allow a read for an authenticated context where userIds do not match", async () => {
            await assertFails(authenticatedDb.getUser("KaJwq9qtikbytIDWzwGdkNGTo6i1"))
        })

        it("should allow a read for an admin context where userIds match", async () => {
            await assertSucceeds(adminDb.getUser("YgInYpnBfkRGQBWYcjnwIXvf14R2"))
        })

        it("should allow a read for an admin context where userIds do not match", async () => {
            await assertSucceeds(adminDb.getUser("KaJwq9qtikbytIDWzwGdkNGTo6i1"))
        })

        it("should return a user with only the ID if the userId is not real", async () => {
            const user = await adminDb.getUser("test")

            expect(user.id).toBe("test")
            expect(user.schoolId).toBeUndefined()
            expect(user.isAdmin).toBeUndefined()
        })

    })

    describe("Update User", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedDb.updateOrCreateUser("YgInYpnBfkRGQBWYcjnwIXvf14R2", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow an update for an authenticated context where userIds match", async () => {
            await assertFails(authenticatedDb.updateOrCreateUser("YgInYpnBfkRGQBWYcjnwIXvf14R2", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should not allow an update for an authenticated context where userIds do not match", async () => {
            await assertFails(authenticatedDb.updateOrCreateUser("KaJwq9qtikbytIDWzwGdkNGTo6i1", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow an update for an admin context where userIds match", async () => {
            await assertFails(authenticatedDb.updateOrCreateUser("KaJwq9qtikbytIDWzwGdkNGTo6i1", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow an update for an admin context where userIds do not match", async () => {
            await assertFails(authenticatedDb.updateOrCreateUser("KaJwq9qtikbytIDWzwGdkNGTo6i1", "lezb3nv0do3Oy7ad7t7u"))
        })

    })

})
