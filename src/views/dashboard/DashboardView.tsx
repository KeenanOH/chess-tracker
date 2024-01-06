import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import List from "../../components/lists/List.tsx"
import PlayerModal from "./components/PlayerModal.tsx"
import { Player } from "../../database/models/firestore/player.ts"
import { AuthContext } from "../../context/AuthContext.ts"
import EditableList from "../../components/lists/EditableList.tsx"
import Button from "../../components/buttons/Button.tsx"
import { FirestoreDatabaseContext } from "../../context/FirestoreDatabaseContext.ts"
import { MatchContext } from "../../context/MatchContext.ts"
import { usePlayers } from "../../hooks/usePlayers.ts"
import { useMatches } from "../../hooks/useMatches.ts"
import { handlePlayerDeletion, navigateToMatchView, openPlayersModal } from "./callbacks.ts"

export default function DashboardView() {

    const { user } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)
    const { setMatch } = useContext(MatchContext)

    const navigate = useNavigate()

    const [matches, setMatches] = useMatches()
    const [players, setPlayers] = usePlayers()

    const [playerModalIsOpen, setPlayerModalIsOpen] = useState(false)
    const [playerModalInitialValue, setPlayerModalInitialValue] = useState<Player>()

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col items-center">
                <List
                    className="pt-8"
                    title="Matches"
                    state={ [matches, setMatches] }
                    display={ match => `${match.homeSchool.name} vs. ${match.awaySchool.name} - ${new Date(match.date).toDateString()}` }
                    onEmpty="No matches to display."
                    onClick={ match => navigateToMatchView(match, setMatch, navigate) }
                />

                <EditableList
                    className="pt-16"
                    title="Players"
                    state={ [players, setPlayers] }
                    display={ player => `${player.firstName} ${player.lastName}` }
                    actions={ [{ name: "Delete", destructive: true, callback: players => handlePlayerDeletion(firestoreDatabase, user, players, setPlayers).then() }] }
                    onEmpty="No players to display."
                    onClick={ player => openPlayersModal(setPlayerModalInitialValue, setPlayerModalIsOpen, player) }
                    trailingButton={
                        <Button onClick={ () => openPlayersModal(setPlayerModalInitialValue, setPlayerModalIsOpen) }>Add Player</Button>
                    }
                />
            </div>
            <Footer />

            <PlayerModal
                isOpen={ playerModalIsOpen }
                setIsOpen={ setPlayerModalIsOpen }
                user={ user! }
                playersState={ [players, setPlayers] }
                initialValue={ playerModalInitialValue }
            />
        </div>
    )
}
