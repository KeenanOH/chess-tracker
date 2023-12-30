import { Match } from "./database/matches.ts"
import ListRow from "./components/ListRow.tsx"
import { Player } from "./database/players.ts"

export function displayMatches(match: Match) {
    return <ListRow key={ match.id }>{ `${match.homeSchool.name} vs ${match.awaySchool.name}` }</ListRow>
}

export function displayPlayers(player: Player) {
    return <ListRow key={ player.id }>{ `${player.firstName} ${player.lastName}` }</ListRow>
}
