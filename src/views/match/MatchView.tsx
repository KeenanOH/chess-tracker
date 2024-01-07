import { useContext, useState } from "react"

import { Board } from "../../database/models/firestore/board.ts"
import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import { toast } from "react-toastify"
import BoardModal from "./components/BoardModal.tsx"
import BoardGrid from "./components/BoardGrid.tsx"
import BackButton from "../../components/buttons/BackButton.tsx"
import { MatchContext } from "../../context/MatchContext.ts"
import { useMatchPlayers } from "../../hooks/useMatchPlayers.ts"
import { useBoards } from "../../hooks/useBoards.ts"

export default function MatchView() {

    const { match} = useContext(MatchContext)

    const { homePlayers, awayPlayers } = useMatchPlayers()
    const [boards, setBoards] = useBoards()

    const [board, setBoard] = useState<Board>()
    const [boardModalIsOpen, setBoardModalIsOpen] = useState(false)

    function openBoardModal(board: Board) {
        if (!match) {
            toast.error("Failed to retrieve match data.")
            return;
        }

        setBoard(board)
        setBoardModalIsOpen(true)
    }

    if (!match)
        return <p className="text-xl">Please navigate to this page through your dashboard.</p>

    return (
        <div>
            <NavigationBar />
            <BackButton />
            <BoardGrid boards={ boards } onClick={ openBoardModal } />
            <BoardModal
                match={ match }
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
