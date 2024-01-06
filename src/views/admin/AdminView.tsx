import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import Calendar from "../../components/input/Calendar.tsx"
import List from "../../components/lists/List.tsx"
import ConditionalRender from "../../components/layouts/ConditionalRender.tsx"
import Button from "../../components/buttons/Button.tsx"
import MatchModal from "./components/MatchModal.tsx"
import { Match } from "../../database/models/firestore/match.ts"
import Title from "../../components/typography/Title.tsx"
// import { RealtimeDatabaseContext } from "../../context/RealtimeDatabaseContext.ts"
import EditableList from "../../components/lists/EditableList.tsx"
import { MatchContext } from "../../context/MatchContext.ts"
import { useAllMatches } from "../../hooks/useAllMatches.ts"
import { useSchools } from "../../hooks/useSchools.ts"
import { navigateToAdminMatchView } from "./callbacks.ts"

export default function AdminView() {

    const navigate = useNavigate()

    const { setMatch } = useContext(MatchContext)
    // const realtimeDatabase = useContext(RealtimeDatabaseContext)

    const [allMatches, setAllMatches] = useAllMatches()
    const schools = useSchools()

    const [matches, setMatches] = useState<Match[]>([])
    const [date, setDate] = useState<Date>(new Date(0))
    const [matchesModalIsOpen, setMatchesModalIsOpen] = useState(false)

    return (
        <div>
            <NavigationBar />

            <div className="flex flex-col items-center pt-16">
                <List
                    className="pb-32"
                    title="All Matches"
                    display={ match => `${match.homeSchool.name} vs. ${match.awaySchool.name} - ${new Date(match.date).toDateString()}` }
                    state={ [allMatches, setAllMatches] }
                    onEmpty="No matches found."
                    onClick={ match => navigateToAdminMatchView(match, setMatch, navigate) }
                />

                <Title>Edit Matches</Title>
                <div className="flex flex-col py-16">
                    <Calendar
                        setDate={ setDate }
                        onChange={ date => setMatches(allMatches.filter(match => match.date == date.toISOString())) }
                    />
                </div>

                <ConditionalRender bool={ date.getTime() != 0 } onFalse={ <p className="text-center py-16">Select a date to view matches.</p> }>
                    <EditableList
                        title={ date.toDateString() }
                        display={ match => `${match.homeSchool.name} vs. ${match.awaySchool.name} - ${new Date(match.date).toDateString()}` }
                        state={ [matches, setMatches] }
                        onEmpty="No matches found."
                        actions={ [{ name: "Publish", callback: console.log }] }
                        trailingButton={ <Button onClick={ () => setMatchesModalIsOpen(true) }>Add Match</Button> }
                    />
                </ConditionalRender>
            </div>

            <Footer />

            <MatchModal isOpen={ matchesModalIsOpen } setIsOpen={ setMatchesModalIsOpen } date={ date } schools={ schools } matchesState={ [matches, setMatches] } />
        </div>
    )
}
