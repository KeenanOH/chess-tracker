import { useContext, useEffect, useState } from "react"

import { Board } from "../../database/models/firestore/board.ts"
import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import { toast } from "react-toastify"
import { Player } from "../../database/models/firestore/player.ts"
import BoardModal from "./components/BoardModal.tsx"
import { FirestoreDatabaseContext } from "../../context/FirestoreDatabaseContext.ts"
import BoardGrid from "./components/BoardGrid.tsx";
import BackButton from "../../components/buttons/BackButton.tsx"
import { MatchContext } from "../../context/MatchContext.ts"

export default function MatchView() {

    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const { match} = useContext(MatchContext)

    const [boards, setBoards] = useState<Board[]>([])
    const [board, setBoard] = useState<Board>()
    const [boardModalIsOpen, setBoardModalIsOpen] = useState(false)
    const [homePlayers, setHomePlayers] = useState<Player[]>([])
    const [awayPlayers, setAwayPlayers] = useState<Player[]>([])

    useEffect(() => {
        if (!match) {
            toast.error("Please navigate to this page through your dashboard.")
            return
        }

        firestoreDatabase.getBoards(match.id)
            .then(boards => setBoards(boards))
            .catch(error => toast.error((error as Error).message))

    }, [])

    function openBoardModal(board: Board) {
        if (!match) {
            toast.error("Failed to retrieve match data.")
            return;
        }

        setBoard(board)

        firestoreDatabase.getPlayers(match.homeSchool.id)
            .then(players => setHomePlayers(players))
            .catch(error => toast.error((error as Error).message))
            .then(() => {
                firestoreDatabase.getPlayers(match.awaySchool.id)
                    .then(players => setAwayPlayers(players))
                    .catch(error => toast.error((error as Error).message))
                    .then(() => {
                        if (homePlayers.length < 1 || awayPlayers.length < 1) {
                            toast.error("Failed to retrieve a roster.")
                            return
                        }

                        setBoardModalIsOpen(true)

                        console.log("Home Players,", homePlayers)
                        console.log("Away Players,", awayPlayers)
                    })
            })
    }

    if (!match)
        return <p className="text-xl">Please navigate to this page through your dashboard.</p>

    return (
        <div>
            <NavigationBar />
            <BackButton />
            <BoardGrid boards={ boards } onClick={ openBoardModal } />
            <BoardModal
                match={ match! }
                board={ board! }
                homePlayers={ homePlayers }
                awayPlayers={ awayPlayers }
                isOpen={ boardModalIsOpen }
                setIsOpen={ setBoardModalIsOpen }
                boardsState={ [boards, setBoards] }
            />
        </div>

    )
}
