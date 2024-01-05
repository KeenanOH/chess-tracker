import React, { useContext, useState } from "react"
import { toast } from "react-toastify"

import { Board } from "../../../database/models/firestore/board.ts"
import Modal from "../../../components/layouts/Modal.tsx"
import { Player } from "../../../database/models/firestore/player.ts"
import Button from "../../../components/buttons/Button.tsx"
import Dropdown from "../../../components/input/Dropdown.tsx"
import { Match } from "../../../database/models/firestore/match.ts"
import { FirestoreDatabaseContext } from "../../../context/FirestoreDatabaseContext.ts"

interface BoardModalProps {
    match: Match
    board: Board
    homePlayers: Player[]
    awayPlayers: Player[]
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    boardsState: [Board[], React.Dispatch<React.SetStateAction<Board[]>>]
}

export default function BoardModal({ match, board, homePlayers, awayPlayers, isOpen, setIsOpen, boardsState }: BoardModalProps) {

    const homePlayerOptions = homePlayers.map(player => {
        return { id: player.id, display: `${player.firstName} ${player.lastName}`} }
    )
    const awayPlayerOptions = awayPlayers.map(player => {
        return { id: player.id, display: `${player.firstName} ${player.lastName}`} }
    )

    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [boards, setBoards] = boardsState
    const [homePlayerId, setHomePlayerId] = useState<string>()
    const [awayPlayerId, setAwayPlayerId] = useState<string>()
    const [result, setResult] = useState<string>()

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const homePlayer = homePlayers.find(player => { return player.id == homePlayerId })
        const awayPlayer = awayPlayers.find(player => { return player.id == awayPlayerId })

        if (!homePlayer || !awayPlayer || !result) return
        if (!["home", "away", "draw"].includes(result.toLowerCase())) return;

        firestoreDatabase.updateBoard(match.id, board.id, homePlayer, awayPlayer, result.toLowerCase() as "home" | "away" | "draw")
            .then(() => {
                setBoards(boards.map(b => {
                    if (b.id != board.id) return b

                    return {
                        id: b.id,
                        homePlayer,
                        awayPlayer,
                        number: b.number,
                        result: result.toLowerCase() as "home" | "away" | "draw"
                    }
                }))

                setIsOpen(false)
                toast.success("Updated board.")
            })
            .catch(error => toast.error((error as Error).message))
    }

    return (
        <Modal title={ "Update Board" } isOpen={ isOpen } setIsOpen={ setIsOpen }>
            <form className="space-y-8" onSubmit={ handleFormSubmit }>
                <Dropdown
                    className="w-64"
                    placeholder="Home Player"
                    options={ homePlayerOptions }
                    onChange={ setHomePlayerId }
                />
                <Dropdown
                    className="w-64"
                    placeholder="Away Player"
                    options={ awayPlayerOptions }
                    onChange={ setAwayPlayerId }
                />
                <Dropdown
                    className="w-64"
                    placeholder="Result"
                    options={ [{ id: "draw", display: "Draw" }, { id: "home", display: "Home" }, { id: "away", display: "Away" }] }
                    onChange={ setResult }
                />
                <Button type="submit">Create</Button>
            </form>
        </Modal>
    )
}
