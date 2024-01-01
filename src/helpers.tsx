import { Match } from "./database/matches.ts"
import ListRow from "./components/ListRow.tsx"
import { Player } from "./database/players.ts"
import BoardCell from "./views/match/components/BoardCell.tsx"
import { Board } from "./database/boards.ts"

export function displayMatch(match: Match) {
    return (
        <ListRow
            key={ match.id }
            className="transition ease-in-out hover:scale-105 active:scale-110"
            to={ `/matches/${match.id}` }
            state={ { match } }
        >
            { `${match.homeSchool.name} vs ${match.awaySchool.name}` }
        </ListRow>
    )
}

export function displayPlayer(player: Player, onClick?: (player: Player) => void) {
    return (
        <ListRow
            key={ player.id }
            className="transition ease-in-out hover:scale-105 active:scale-110"
            onClick={ () => onClick ? onClick(player) : { } }
        >
            { `${player.firstName} ${player.lastName}` }
        </ListRow>
    )
}

export function displayBoard(board: Board) {
    return <BoardCell key={ board.id } board={ board } />
}
