import { Result } from "../../../database/models/realtime/result.ts"

interface ResultDisplayProps {
    result: Result
}

export default function ResultDisplay({ result }: ResultDisplayProps) {

    return (
        <div>
            <p>{ `${result.homeSchool.name} (${result.homeScore})` }</p>
            <p>{ `${result.awaySchool.name} (${result.awayScore})` }</p>

            {
                result.boards.map(board => {
                    if (!board.homePlayer || !board.awayPlayer) return <p />

                    return <p>{ `${board.number}) ${board.result} - ${board.homePlayer.firstName} ${board.homePlayer.lastName} vs. ${board.awayPlayer.firstName} ${board.awayPlayer.lastName}` }</p>
                })
            }
        </div>
    )
}
