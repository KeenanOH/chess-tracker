import {useEffect, useState} from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import ListRow from "../../components/ListRow.tsx"
import Button from "../../components/Button.tsx"
import Footer from "../../components/Footer.tsx"
import { User } from "../../database/users.ts"
import { getMatches, Match } from "../../database/matches.ts"
import MatchesList from "../../components/MatchesList.tsx"

interface DashboardViewProps {
    user: User | null
}

export default function DashboardView({ user }: DashboardViewProps) {

    const [matches, setMatches] = useState<Match[]>([])

    useEffect(() => {
        if (!user) return

        getMatches({ schoolId: user.school.id })
            .then((matches) => {
                setMatches(matches)
            })
    }, [user])

    return (
        <div>
            <NavigationBar />
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
                            <ListRow>Test</ListRow>
                            <ListRow>Test</ListRow>
                            <ListRow>Test</ListRow>
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
