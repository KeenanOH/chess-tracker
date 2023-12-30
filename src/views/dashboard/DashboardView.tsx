import React from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import Button from "../../components/Button.tsx"
import Footer from "../../components/Footer.tsx"
import { User } from "../../database/users.ts"
import { getMatches, Match } from "../../database/matches.ts"
import List from "../../components/List.tsx";
import ListRow from "../../components/ListRow.tsx";
import {getPlayers, Player} from "../../database/players.ts";

interface DashboardViewProps {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function DashboardView({ user, setUser }: DashboardViewProps) {

    async function getMatchesFromUser(user: User) {
        if (!user.schoolId) return []

        return await getMatches({ schoolId: user.schoolId })
    }

    async function getPlayersFromUser(user: User) {
        if (!user.schoolId) return []

        return await getPlayers(user.schoolId)
    }

    function displayMatches(match: Match) {
        return <ListRow key={ match.id }>{ `${match.homeSchool.name} vs ${match.awaySchool.name}` }</ListRow>
    }

    function displayPlayers(player: Player) {
        return <ListRow key={ player.id }>{ `${player.firstName} ${player.lastName}` }</ListRow>
    }

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <div className="flex flex-col items-center">
                <List className="pt-8" title="Schedule" loader={ getMatchesFromUser(user) } display={ displayMatches }/>
                <List className="pt-32" title="Players" loader={ getPlayersFromUser(user) } display={ displayPlayers } trailingButton={ <Button onClick={ () => { } }>Add Players</Button> }/>
            </div>

            <Footer />
        </div>
    )
}
