import { Board } from "../../../database/boards.ts"


interface BoardCellProps {
    board: Board
    onClick: (board: Board) => void
}

export default function BoardCell({ board, onClick }: BoardCellProps) {

    return (
        <div className="flex flex-col text-center items-center mx-8 transition ease-in-out hover:scale-105 active:scale-110 cursor-pointer" onClick={ () => onClick(board) }>
            <div className="bg-primary bg-opacity-50 py-8 w-full border-2 border-primary rounded-xl">
                <p className="font-black text-3xl">{ board.number }</p>
                <div className="py-4">
                    <p>{ `${board.homePlayer.firstName} ${board.homePlayer.lastName}` }</p>
                    <p>vs.</p>
                    <p>{ `${board.awayPlayer.firstName} ${board.awayPlayer.lastName}` }</p>
                </div>
                <p className="font-bold">{ board.result == "" ? "n/a" : board.result }</p>
            </div>
        </div>
    )
}
