import React, { useState } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import Calendar from "../../components/input/Calendar.tsx"
import { User } from "../../database/users.ts"
import List from "../../components/layouts/List.tsx"
import { getMatches, Match } from "../../database/matches.ts"
import { displayMatch } from "../../helpers.tsx"
import ConditionalRender from "../../components/layouts/ConditionalRender.tsx"
import Button from "../../components/input/Button.tsx";
import MatchModal from "./components/MatchModal.tsx"
import {getSchools, School} from "../../database/schools.ts"

interface AdminViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function AdminView({ user, setUser }: AdminViewProps) {

    const [matches, setMatches] = useState<Match[]>([])
    const [date, setDate] = useState<Date>(new Date(0))
    const [matchesModalIsOpen, setMatchesModalIsOpen] = useState(false)
    const [schools, setSchools] = useState<School[]>([])

    function updateMatches(date: Date) {
        getMatches({ date })
            .then(matches => setMatches(matches))
            .catch(error => toast.error((error as Error).message))
    }

    function openMatchModal() {
        if (schools.length < 1)
            getSchools()
                .then(schools => {
                    setSchools(schools)
                })
                .catch(error => toast.error((error as Error).message))

        setMatchesModalIsOpen(true)
    }

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />

            <div className="flex flex-col items-center pt-16">
                <div className="flex flex-col py-16">
                    <Calendar setDate={ setDate } onChange={ updateMatches } />
                </div>

                <ConditionalRender bool={ date.getTime() != 0 } onFalse={ <p className="text-center py-16">Select a date to view matches.</p> }>
                    <List
                        title={ date.toDateString() }
                        display={ displayMatch }
                        state={ [matches, setMatches] }
                        onEmpty={ <p className="text-center py-16">No matches found.</p> }
                        trailingButton={ <Button onClick={ () => openMatchModal() }>Add Match</Button> }
                    />
                </ConditionalRender>
            </div>

            <Footer />

            <MatchModal isOpen={ matchesModalIsOpen } setIsOpen={ setMatchesModalIsOpen } date={ date } schools={ schools } matchesState={ [matches, setMatches] } />
        </div>
    )
}
