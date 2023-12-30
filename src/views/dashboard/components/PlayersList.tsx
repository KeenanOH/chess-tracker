import { Player } from "../../../database/players.ts"
import ListRow from "../../../components/ListRow.tsx"

interface PlayersListProps {
    players: Player[]
}

export default function PlayersList({ players }: PlayersListProps) {
    if (players.length < 1)
        return (
            <p className="text-center pt-16">No players yet. Please add some.</p>
        )

    return (
        <div className="flex flex-col">
            {
                players.map(player => {
                    return <ListRow key={ player.id }>{ `${player.firstName} ${player.lastName}` }</ListRow>
                })
            }
        </div>
    )
}
