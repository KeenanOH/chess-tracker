import React from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import Button from "../../components/Button.tsx"
import Footer from "../../components/Footer.tsx"
import { User } from "../../database/users.ts"
import { getMatches } from "../../database/matches.ts"
import List from "../../components/List.tsx"
import { getPlayersFromUser } from "../../database/helpers.ts"
import {displayMatches, displayPlayers} from "../../helpers.tsx"

interface DashboardViewProps {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function DashboardView({ user, setUser }: DashboardViewProps) {
    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <div className="flex flex-col items-center">
                <List
                    className="pt-8"
                    title="Schedule"
                    loader={ getMatches(user) }
                    display={ displayMatches }
                />
                <List
                    className="pt-32"
                    title="Players"
                    loader={ getPlayersFromUser(user) }
                    display={ displayPlayers }
                    trailingButton={ <Button onClick={ () => { } }>Add Players</Button> }
                />
            </div>

            <Footer />
        </div>
    )
}
