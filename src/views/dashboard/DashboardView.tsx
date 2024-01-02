import React, { useState } from "react"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Button from "../../components/input/Button.tsx"
import Footer from "../../components/typography/Footer.tsx"
import { User } from "../../database/models/user.ts"
import { Match } from "../../database/models/match.ts"
import List from "../../components/layouts/List.tsx"
import { displayMatch, displayPlayer } from "../../helpers.tsx"
import PlayerModal from "./components/PlayerModal.tsx"
import { Player } from "../../database/models/player.ts"
import { firestoreDatabase } from "../../consts.ts"

interface DashboardViewProps {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function DashboardView({ user, setUser }: DashboardViewProps) {

    const matchesState = useState<Match[]>([])
    const playersState = useState<Player[]>([])
    const [playerModalIsOpen, setPlayerModalIsOpen] = useState(false)
    const [playerModalInitialValue, setPlayerModalInitialValue] = useState<Player>()

    function openPlayersModal(player?: Player) {
        if (!player) {
            setPlayerModalInitialValue(undefined)
            setPlayerModalIsOpen(true)
        }

        setPlayerModalInitialValue(player)
        setPlayerModalIsOpen(true)
    }

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <div className="flex flex-col items-center">
                <List
                    className="pt-8"
                    title="Schedule"
                    loader={ firestoreDatabase.getMatches(user) }
                    display={ displayMatch }
                    state={ matchesState }
                />

                <List
                    className="pt-32"
                    title="Players"
                    loader={
                        (async () => {
                            if (!user.schoolId) return []
                            return await firestoreDatabase.getPlayers(user.schoolId)
                        })()
                    }
                    display={ displayPlayer }
                    trailingButton={ <Button onClick={ () => { openPlayersModal() } }>Add Players</Button> }
                    state={ playersState }
                    onClick={ (player) =>  openPlayersModal(player) }
                />
            </div>
            <Footer />

            <PlayerModal
                isOpen={ playerModalIsOpen }
                setIsOpen={ setPlayerModalIsOpen }
                user={ user }
                playersState={ playersState }
                initialValue={ playerModalInitialValue }
            />
        </div>
    )
}
