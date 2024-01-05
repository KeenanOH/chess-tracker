import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import { Match } from "../../database/models/firestore/match.ts"
import List from "../../components/lists/List.tsx"
import PlayerModal from "./components/PlayerModal.tsx"
import { Player } from "../../database/models/firestore/player.ts"
import { AuthContext } from "../../context/AuthContext.ts"
import EditableList from "../../components/lists/EditableList.tsx"
import Button from "../../components/buttons/Button.tsx"
import { FirestoreDatabaseContext } from "../../context/FirestoreDatabaseContext.ts"
import {MatchContext} from "../../context/MatchContext.ts";

export default function DashboardView() {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)
    const { setMatch } = useContext(MatchContext)

    const [matches, setMatches] = useState<Match[]>([])
    const [players, setPlayers] = useState<Player[]>([])
    const [playerModalIsOpen, setPlayerModalIsOpen] = useState(false)
    const [playerModalInitialValue, setPlayerModalInitialValue] = useState<Player>()

    useEffect(() => {
        if (!user.schoolId) return

        firestoreDatabase.getPlayers(user.schoolId)
            .then(players => {
                setPlayers(players.map(player => {
                    return {
                        id: player.id,
                        firstName: player.firstName,
                        lastName: player.lastName,
                        selected: false
                    }
                }))
            })

        firestoreDatabase.getMatches({ schoolId: user.schoolId })
            .then(matches => {
                setMatches(matches.map(match => {
                    return {
                        id: match.id,
                        homeSchool: match.homeSchool,
                        awaySchool: match.awaySchool,
                        date: match.date,
                        selected: false

                    }
                }))
            })
    }, [])

    function openPlayersModal(player?: Player) {
        if (!player) {
            setPlayerModalInitialValue(undefined)
            setPlayerModalIsOpen(true)
        }

        setPlayerModalInitialValue(player)
        setPlayerModalIsOpen(true)
    }

    function handlePlayersDelete(players: Player[]) {
        if (!user.schoolId) return

        firestoreDatabase.deletePlayers(user.schoolId, players)
            .then(() => {
                setPlayers(allPlayers => {
                    return allPlayers.filter(player => !players.includes(player))
                })

                toast.success("Deleted selected player(s)")
            })
            .catch(error => toast.error((error as Error).message))
    }

    function openMatchView(match: Match) {
        setMatch(match)
        navigate(`/matches/${match.id}`)
    }

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
                    onClick={ openMatchView }
                />

                <EditableList
                    className="pt-16"
                    title="Players"
                    state={ [players, setPlayers] }
                    display={ player => `${player.firstName} ${player.lastName}` }
                    actions={ [{ name: "Delete", destructive: true, callback: handlePlayersDelete }] }
                    onEmpty="No players to display."
                    onClick={ openPlayersModal }
                    trailingButton={ <Button onClick={ openPlayersModal }>Add Player</Button> }
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
