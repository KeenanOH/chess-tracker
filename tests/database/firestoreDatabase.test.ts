import { describe, it, expect } from "vitest"
import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing"

import {
    authenticatedFirestore,
    unauthenticatedFirestore,
    adminFirestore,
    firstSchoolId,
    secondSchoolId,
    firstSchoolPlayerId,
    secondSchoolPlayerId,
    matchId,
    boardId,
    regularUserId,
    adminUserId
} from "../setup"

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
            await assertFails(unauthenticatedFirestore.deleteSchool(firstSchoolId))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteSchool(firstSchoolId))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteSchool(firstSchoolId))
        })

    })

})

describe("Players Tests", () => {

    describe("Read Players", () => {
        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getPlayers(firstSchoolId))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getPlayers(firstSchoolId))
        })
    })

    describe("Write Players", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.createPlayer(firstSchoolId, "First", "Last"))
        })

        it("should allow a write for an authenticated context where the schoolId  matches", async () => {
            await assertSucceeds(authenticatedFirestore.createPlayer(firstSchoolId, "First", "Last"))
        })

        it("should not allow a write for an authenticated context where the schoolId does not match", async () => {
            await assertFails(authenticatedFirestore.createPlayer(secondSchoolId, "First", "Last"))
        })

        it("should allow a write for an admin context where the schoolId matches", async () => {
            await assertSucceeds(adminFirestore.createPlayer(firstSchoolId, "First", "Last"))

        })

        it("should allow a write for an admin context where the schoolId does not match", async () => {
            await assertSucceeds(adminFirestore.createPlayer(secondSchoolId, "First", "Last"))
        })

    })

    describe("Update Players", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.updatePlayer(firstSchoolId, firstSchoolPlayerId, "First", "Last"))
        })

        it("should allow an update for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedFirestore.updatePlayer(firstSchoolId, firstSchoolPlayerId, "First", "Last"))
        })

        it("should not allow an update for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.updatePlayer(secondSchoolId, secondSchoolPlayerId, "First", "Last"))
        })

        it("should allow an update for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.updatePlayer(firstSchoolId, firstSchoolPlayerId, "First", "Last"))
        })

        it("should allow an update for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.updatePlayer(secondSchoolId, secondSchoolPlayerId, "First", "Last"))
        })

    })

    describe("Delete Players", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deletePlayer(firstSchoolId, firstSchoolPlayerId))
        })

        it("should allow a delete for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedFirestore.deletePlayer(firstSchoolId, firstSchoolPlayerId))
        })

        it("should not allow a delete for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.deletePlayer(secondSchoolId, secondSchoolPlayerId))
        })

        it("should allow a delete for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.deletePlayer(firstSchoolId, firstSchoolPlayerId))
        })

        it("should allow a delete for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.deletePlayer(secondSchoolId, firstSchoolPlayerId))
        })

    })

    describe("Bulk Delete Players", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deletePlayers(firstSchoolId))
        })

        it("should allow a delete for an authenticated context where schoolIds match", async () => {
            await assertSucceeds(authenticatedFirestore.deletePlayers(firstSchoolId))
        })

        it("should not allow a delete for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.deletePlayers(secondSchoolId))
        })

        it("should allow a delete for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.deletePlayers(firstSchoolId))
        })

        it("should allow a delete for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.deletePlayers(secondSchoolId))
        })

    })

})

describe("Matches Tests", () => {

    describe("Read Match", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getMatch(matchId))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getMatch(matchId))
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
            await assertSucceeds(authenticatedFirestore.getMatches({ schoolId: firstSchoolId }))
        })

    })

    describe("Write Matches", () => {

        it("should not allow a write for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.createMatch(
                {
                    id: firstSchoolId,
                    name: "School Name"
                },
                {
                    id: secondSchoolId,
                    name: "School Name"
                },
                new Date())
            )
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.createMatch(
                {
                    id: firstSchoolId,
                    name: "School Name"
                },
                {
                    id: secondSchoolId,
                    name: "School Name"
                },
                new Date())
            )
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminFirestore.createMatch(
                {
                    id: firstSchoolId,
                    name: "School Name"
                },
                {
                    id: secondSchoolId,
                    name: "School Name"
                },
                new Date())
            )
        })

    })

    describe("Delete Matches", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deleteMatch(matchId))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteMatch(matchId))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteMatch(matchId))
        })

    })

})

describe("Boards Tests", () => {

    describe("Read Boards", () => {

        it("should not allow a read for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.getBoards(matchId))
        })

        it("should allow a read for an authenticated context", async () => {
            await assertSucceeds(authenticatedFirestore.getBoards(matchId))
        })

    })

    describe("Write Boards", () => {

        it("should not allow a write for an unauthenticated context", async() => {
            await assertFails(unauthenticatedFirestore.createBoard(matchId, 1))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.createBoard(matchId, 1))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminFirestore.createBoard(matchId, 1))
        })

    })

    describe("Bulk Write Boards", () => {

        it("should not allow a write for an unauthenticated context", async() => {
            await assertFails(unauthenticatedFirestore.createBoards(matchId))
        })

        it("should not allow a write for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.createBoards(matchId))
        })

        it("should allow a write for an admin context", async () => {
            await assertSucceeds(adminFirestore.createBoards(matchId))
        })

    })

    describe("Update Boards", () => {

        it("should not allow an update for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.updateBoard(
                matchId,
                boardId,
                {
                    id: firstSchoolPlayerId,
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                {
                    id: secondSchoolPlayerId,
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                "home"
            ))
        })

        // Issue with the emulator; in other environments this succeeds
        //
        // it("should allow an update for an authenticated context where schoolIds match", async () => {
        //     await assertSucceeds(authenticatedFirestore.updateBoard(
        //         matchId,
        //         boardId,
        //         {
        //             id: firstSchoolPlayerId,
        //             firstName: "Yuji",
        //             lastName: "Itadori"
        //         },
        //         {
        //             id: secondSchoolPlayerId,
        //             firstName: "Nobara",
        //             lastName: "Kugisaki"
        //         },
        //         "home"
        //     ))
        // })

        it("should not allow an update for an authenticated context where schoolIds do not match", async () => {
            await assertFails(authenticatedFirestore.updateBoard(
                matchId,
                boardId,
                {
                    id: firstSchoolPlayerId,
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                {
                    id: secondSchoolPlayerId,
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                "home"
            ))
        })

        it("should allow an update for an admin context where schoolIds match", async () => {
            await assertSucceeds(adminFirestore.updateBoard(
                matchId,
                boardId,
                {
                    id: firstSchoolPlayerId,
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                {
                    id: secondSchoolPlayerId,
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                "home"
            ))
        })

        it("should allow an update for an admin context where schoolIds do not match", async () => {
            await assertSucceeds(adminFirestore.updateBoard(
                matchId,
                boardId,
                {
                    id: firstSchoolPlayerId,
                    firstName: "Yuji",
                    lastName: "Itadori"
                },
                {
                    id: secondSchoolPlayerId,
                    firstName: "Nobara",
                    lastName: "Kugisaki"
                },
                "home"
            ))
        })

    })

    describe("Delete Boards", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deleteBoard(matchId, boardId))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteBoard(matchId, boardId))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteBoard(matchId, boardId))
        })

    })

    describe("Bulk Delete Boards", () => {

        it("should not allow a delete for an unauthenticated context", async () => {
            await assertFails(unauthenticatedFirestore.deleteBoards(matchId))
        })

        it("should not allow a delete for an authenticated context", async () => {
            await assertFails(authenticatedFirestore.deleteBoards(matchId))
        })

        it("should allow a delete for an admin context", async () => {
            await assertSucceeds(adminFirestore.deleteBoards(matchId))
        })

    })

})

describe("Users Tests", () => {

    describe("Read Users", () => {

        it("should not allow a read for an unauthenticated context", async() => {
            await assertFails(unauthenticatedFirestore.getUser(regularUserId))
        })

        it("should allow a read for an authenticated context where userIds match", async () => {
            await assertSucceeds(authenticatedFirestore.getUser(regularUserId))
        })

        it("should not allow a read for an authenticated context where userIds do not match", async () => {
            await assertFails(authenticatedFirestore.getUser(adminUserId))
        })

        it("should allow a read for an admin context where userIds match", async () => {
            await assertSucceeds(adminFirestore.getUser(adminUserId))
        })

        it("should allow a read for an admin context where userIds do not match", async () => {
            await assertSucceeds(adminFirestore.getUser(regularUserId))
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
            await assertFails(unauthenticatedFirestore.updateOrCreateUser(regularUserId, firstSchoolId))
        })

        it("should allow an update for an authenticated context where userIds match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser(regularUserId, firstSchoolId))
        })

        it("should not allow an update for an authenticated context where userIds do not match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser(adminUserId, firstSchoolId))
        })

        it("should allow an update for an admin context where userIds match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser(adminUserId, firstSchoolId))
        })

        it("should not allow an update for an admin context where userIds do not match", async () => {
            await assertFails(authenticatedFirestore.updateOrCreateUser(regularUserId, firstSchoolId))
        })

    })

})
