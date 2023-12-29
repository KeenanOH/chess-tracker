import { getBoards, createBoard, updateBoard, deleteBoard } from "../../src/database/boards"


describe("Boards Tests", () => {

    test("Get Boards", async () => {
        const boards = await getBoards("8A8xI4oLsLivRLpYIHL9")
        const boardIds = boards.map((board) => { return board.id })
        expect(boardIds).toContain("yZetG6LtsC5WhMw45WvL")
    })

    test("Update Board", async () => {
        await updateBoard("8A8xI4oLsLivRLpYIHL9", "yZetG6LtsC5WhMw45WvL", undefined, undefined, "home")

        const boards = await getBoards("8A8xI4oLsLivRLpYIHL9")
        const board = boards.find((board) => { return board.id === "yZetG6LtsC5WhMw45WvL" })

        expect(board).toBeDefined()
        if (!board) throw new Error()

        expect(board.result).toBe("home")
    })

    test("Create Board", async () => {
        await createBoard("8A8xI4oLsLivRLpYIHL9", "", "", 7, "")

        const boards = await getBoards("8A8xI4oLsLivRLpYIHL9")
        const board = boards.find((board) => { return board.number == 7 })

        expect(board).toBeDefined()
        if (!board) throw new Error()
    })

    afterAll(async () => {
        let boards = await getBoards("8A8xI4oLsLivRLpYIHL9")
        const board = boards.find((board) => { return board.number == 7 })

        expect(board).toBeDefined()
        if (!board) throw new Error()

        await deleteBoard("8A8xI4oLsLivRLpYIHL9", board.id)

        boards = await getBoards("8A8xI4oLsLivRLpYIHL9")
        const boardIds = boards.map((board) => { return board.id })
        expect(boardIds.includes(board.id)).toBeFalsy()
    })

})

