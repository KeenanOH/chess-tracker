import BoardCell from "./BoardCell.tsx"
import { Board } from "../../../database/models/firestore/board.ts"

interface BoardGridProps {
    boards: Board[]
    onClick?: (board: Board) => void
}

export default function BoardGrid({ boards, onClick }: BoardGridProps) {

    return (
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 pt-16">
            {
                boards.map(board => {
                    return <BoardCell key={ board.id } board={ board } onClick={ onClick } />
                })
            }
        </div>
    )
}
