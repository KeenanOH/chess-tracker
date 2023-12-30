import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/NavigationBar.tsx"
import Button from "../../components/Button.tsx"
import Footer from "../../components/Footer.tsx"
import { User } from "../../database/users.ts"
import { getMatches, Match } from "../../database/matches.ts"
import MatchesList from "../../components/MatchesList.tsx"
import { getPlayers, Player } from "../../database/players.ts"
import PlayersList from "./components/PlayersList.tsx"

interface DashboardViewProps {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function DashboardView({ user, setUser }: DashboardViewProps) {

    const [matches, setMatches] = useState<Match[]>([])
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        if (!user.schoolId) return

        console.log("Getting matches...")
        getMatches({ schoolId: user.schoolId })
            .then(matches => setMatches(matches))
            .catch(error => {
                console.log(error)
                toast.error("Error retrieving matches")
            })
    }, [user])

    useEffect(() => {
        if (!user.schoolId) return

        console.log("Getting players...")
        getPlayers(user.schoolId)
            .then(players => setPlayers(players))
            .catch(error => {
                console.log(error)
                toast.error("Error retrieving players")
            })
    }, [user])

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <div className="flex flex-col items-center">
                <div className="w-full pt-8">
                    <div className="mx-16 2xl:mx-96">
                        <p className="text-3xl opacity-50 pb-5">Schedule</p>
                        <div className="space-y-5">
                            <MatchesList matches={ matches } />
                        </div>
                    </div>
                </div>

                <div className="w-full pt-32">
                    <div className="mx-16 2xl:mx-96">
                        <p className="text-3xl opacity-50 pb-5">Players</p>
                        <div className="space-y-5">
                            <PlayersList players={ players } />
                        </div>
                        <div className="flex justify-center md:justify-end pt-4">
                            <div className="w-48">
                                <Button onClick={ () => { } }>Add Players</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
