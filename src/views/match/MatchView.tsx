import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Board } from "../../database/models/board.ts"
import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import { toast } from "react-toastify"
import BoardCell from "./components/BoardCell.tsx"
import { Player } from "../../database/models/player.ts"
import BoardModal from "./components/BoardModal.tsx"
import { Match } from "../../database/models/match.ts"
import { firestoreDatabase } from "../../consts.ts"

export default function MatchView() {
    
    // const location = useLocation()
    const { id } = useParams()

    const [match, setMatch] = useState<Match>()
    const [boards, setBoards] = useState<Board[]>([])
    const [board, setBoard] = useState<Board>()
    const [boardModalIsOpen, setBoardModalIsOpen] = useState(false)
    const [homePlayers, setHomePlayers] = useState<Player[]>([])
    const [awayPlayers, setAwayPlayers] = useState<Player[]>([])

    useEffect(() => {
        const promise = async () => {
            if (!id) return

            const match = await firestoreDatabase.getMatch(id)
            setMatch(match)

            if (!match) return

            setBoards(await firestoreDatabase.getBoards(match.id))
        }

        promise()
            .catch(error => toast.error((error as Error).message))
    }, [id])

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

    return (
        <div>
            <NavigationBar />

            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 pt-16">
                {
                    boards.map(board => {
                        return <BoardCell key={ board.id } board={ board } onClick={ openBoardModal } />
                    })
                }
            </div>
            
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
