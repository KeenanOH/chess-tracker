import {useContext, useEffect, useState} from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
// import Button from "../../components/input/Button.tsx"
import Footer from "../../components/typography/Footer.tsx"
import { SelectableMatch } from "../../database/models/match.ts"
import List from "../../components/layouts/List.tsx"
import PlayerModal from "./components/PlayerModal.tsx"
import { SelectablePlayer } from "../../database/models/player.ts"
import { firestoreDatabase } from "../../consts.ts"
import { AuthContext } from "../../context/AuthContext.ts"
import EditableList from "../../components/layouts/EditableList.tsx";
import Button from "../../components/input/Button.tsx";


export default function DashboardView() {

    const { user } = useContext(AuthContext)
    const [matches, setMatches] = useState<SelectableMatch[]>([])
    const [players, setPlayers] = useState<SelectablePlayer[]>([])
    const [playerModalIsOpen, setPlayerModalIsOpen] = useState(false)
    const [playerModalInitialValue, setPlayerModalInitialValue] = useState<SelectablePlayer>()

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
    }, []);

    function openPlayersModal(player?: SelectablePlayer) {
        if (!player) {
            setPlayerModalInitialValue(undefined)
            setPlayerModalIsOpen(true)
        }

        setPlayerModalInitialValue(player)
        setPlayerModalIsOpen(true)
    }

    function handlePlayersDelete(players: SelectablePlayer[]) {
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
