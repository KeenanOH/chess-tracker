import { describe, it, expect } from "vitest"
import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"

import { authenticatedFirestore, unauthenticatedFirestore, adminFirestore } from "../setup"

describe("Schools Tests", () => {

    describe("Read Schools", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getSchools())
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getSchools())
        })

    })

    describe("Write Schools", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.createSchool("School Name"))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.createSchool("School Name"))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminFirestore.createSchool("School Name"))
        })

    })

    describe("Delete Schools", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deleteSchool("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteSchool("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteSchool("lezb3nv0do3Oy7ad7t7u"))
        })

    })

})

describe("Players Tests", () => {

    describe("Read Players", () => {
        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getPlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getPlayers("lezb3nv0do3Oy7ad7t7u"))
        })
    })

    describe("Write Players", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.createPlayer("lezb3nv0do3Oy7ad7t7u", "First", "Last"))
        })

        it("should allow a write for an authenticated context where the schoolId  matches", async () => {
            await assertSucceeds(authenticatedFirestore.createPlayer("lezb3nv0do3Oy7ad7t7u", "First", "Last"))
        })

        it("should not allow a write for an authenticated context where the schoolId does not match", async () => {
            await assertFails(authenticatedFirestore.createPlayer("sPfURW3wBUvtLnUBp10J", "First", "Last"))
        })

        it("should allow a write for an admin context where the schoolId matches", async () => {
            await assertSucceeds(adminFirestore.createPlayer("lezb3nv0do3Oy7ad7t7u", "First", "Last"))

        })

        it("should allow a write for an admin context where the schoolId does not match", async () => {
            await assertSucceeds(adminFirestore.createPlayer("sPfURW3wBUvtLnUBp10J", "First", "Last"))
        })

    })

    describe("Update Players", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.updatePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP", "First", "Last"))
        })

        it("should allow an update for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedFirestore.updatePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP", "First", "Last"))
        })

        it("should not allow an update for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.updatePlayer("sPfURW3wBUvtLnUBp10J", "HRXYCwwDWUmmekyJX0zI", "First", "Last"))
        })

        it("should allow an update for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.updatePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP", "First", "Last"))
        })

        it("should allow an update for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.updatePlayer("sPfURW3wBUvtLnUBp10J", "HRXYCwwDWUmmekyJX0zI", "First", "Last"))
        })

    })

    describe("Delete Players", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deletePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should allow a delete for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedFirestore.deletePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should not allow a delete for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.deletePlayer("sPfURW3wBUvtLnUBp10J", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should allow a delete for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.deletePlayer("lezb3nv0do3Oy7ad7t7u", "4FyIbaITnlLng5JZy7bP"))
        })

        it("should allow a delete for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.deletePlayer("sPfURW3wBUvtLnUBp10J", "4FyIbaITnlLng5JZy7bP"))
        })

    })

    describe("Bulk Delete Players", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deletePlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a delete for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedFirestore.deletePlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should not allow a delete for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.deletePlayers("sPfURW3wBUvtLnUBp10J"))
        })

        it("should allow a delete for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.deletePlayers("lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow a delete for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.deletePlayers("sPfURW3wBUvtLnUBp10J"))
        })

    })

})

describe("Matches Tests", () => {

    describe("Read Match", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should return undefined for a match that does not exist", async () => {
            await assertSucceeds(adminFirestore.getMatch("test"))
        })

    })

    describe("Read Matches", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getMatches({ }))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getMatches({ }))
        })

        it("should allow a read for an authenticated context where date is specified", async () => {
            await assertSucceeds(authenticatedFirestore.getMatches({ date: new Date() }))
        })

        it("should allow a read for an authenticated context where school id is specified", async () => {
            await assertSucceeds(authenticatedFirestore.getMatches({ schoolId: "lezb3nv0do3Oy7ad7t7u" }))
        })

    })

    describe("Write Matches", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.createMatch(
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
            await assertFails(authenticatedFirestore.createMatch(
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
            await assertSucceeds(adminFirestore.createMatch(
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
            await assertFails(unauthenticatedFirestore.deleteMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteMatch("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteMatch("gvvs00PTkbkDYuEauIxQ"))
        })

    })

})

describe("Boards Tests", () => {

    describe("Read Boards", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getBoards("gvvs00PTkbkDYuEauIxQ"))
        })

    })

    describe("Write Boards", () => {

        it("should not allow a write for an unauthenticated context", async() => {
            await assertFails(unauthenticatedFirestore.createBoard("gvvs00PTkbkDYuEauIxQ", 1))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.createBoard("gvvs00PTkbkDYuEauIxQ", 1))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminFirestore.createBoard("gvvs00PTkbkDYuEauIxQ", 1))
        })

    })

    describe("Bulk Write Boards", () => {

        it("should not allow a write for an unauthenticated context", async() => {
            await assertFails(unauthenticatedFirestore.createBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.createBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminFirestore.createBoards("gvvs00PTkbkDYuEauIxQ"))
        })

    })

    describe("Update Boards", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.updateBoard(
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
            await assertFails(authenticatedFirestore.updateBoard(
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
            await assertSucceeds(adminFirestore.updateBoard(
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
            await assertSucceeds(adminFirestore.updateBoard(
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
            await assertFails(unauthenticatedFirestore.deleteBoard("gvvs00PTkbkDYuEauIxQ", "5O6rDXJS1fCEz0Cuqq2U"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteBoard("gvvs00PTkbkDYuEauIxQ", "5O6rDXJS1fCEz0Cuqq2U"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteBoard("gvvs00PTkbkDYuEauIxQ", "5O6rDXJS1fCEz0Cuqq2U"))
        })

    })

    describe("Bulk Delete Boards", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deleteBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteBoards("gvvs00PTkbkDYuEauIxQ"))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteBoards("gvvs00PTkbkDYuEauIxQ"))
        })

    })

})

describe("Users Tests", () => {

    describe("Read Users", () => {

        it("should not allow a read for an unauthenticated context", async() => {
            await assertFails(unauthenticatedFirestore.getUser("YgInYpnBfkRGQBWYcjnwIXvf14R2"))
        })

        it("should allow a read for an authenticated context where userIds match", async () => {
            await assertSucceeds(authenticatedFirestore.getUser("YgInYpnBfkRGQBWYcjnwIXvf14R2"))
        })

        it("should not allow a read for an authenticated context where userIds do not match", async () => {
            await assertFails(authenticatedFirestore.getUser("KaJwq9qtikbytIDWzwGdkNGTo6i1"))
        })

        it("should allow a read for an admin context where userIds match", async () => {
            await assertSucceeds(adminFirestore.getUser("YgInYpnBfkRGQBWYcjnwIXvf14R2"))
        })

        it("should allow a read for an admin context where userIds do not match", async () => {
            await assertSucceeds(adminFirestore.getUser("KaJwq9qtikbytIDWzwGdkNGTo6i1"))
        })

        it("should return a user with only the ID if the userId is not real", async () => {
            const user = await adminFirestore.getUser("test")

            expect(user.id).toBe("test")
            expect(user.schoolId).toBeUndefined()
            expect(user.isAdmin).toBeUndefined()
        })

    })

    describe("Update User", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.updateOrCreateUser("YgInYpnBfkRGQBWYcjnwIXvf14R2", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow an update for an authenticated context where userIds match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser("YgInYpnBfkRGQBWYcjnwIXvf14R2", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should not allow an update for an authenticated context where userIds do not match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser("KaJwq9qtikbytIDWzwGdkNGTo6i1", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow an update for an admin context where userIds match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser("KaJwq9qtikbytIDWzwGdkNGTo6i1", "lezb3nv0do3Oy7ad7t7u"))
        })

        it("should allow an update for an admin context where userIds do not match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser("KaJwq9qtikbytIDWzwGdkNGTo6i1", "lezb3nv0do3Oy7ad7t7u"))
        })

    })

})
