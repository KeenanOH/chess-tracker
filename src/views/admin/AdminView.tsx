import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import Calendar from "../../components/input/Calendar.tsx"
import List from "../../components/layouts/List.tsx"
import ConditionalRender from "../../components/layouts/ConditionalRender.tsx"
import Button from "../../components/input/Button.tsx"
import MatchModal from "./components/MatchModal.tsx"
import { Match } from "../../database/models/match.ts"
import {firestoreDatabase, realtimeDatabase} from "../../consts.ts"
import { School } from "../../database/models/school.ts"
import Title from "../../components/typography/Title.tsx"

export default function AdminView() {

    const [allMatches, setAllMatches] = useState<Match[]>([])
    const [matches, setMatches] = useState<Match[]>([])
    const [date, setDate] = useState<Date>(new Date(0))
    const [matchesModalIsOpen, setMatchesModalIsOpen] = useState(false)
    const [schools, setSchools] = useState<School[]>([])

    useEffect(() => {
        firestoreDatabase.getMatches({ })
            .then(matches => setAllMatches(matches))
            .catch(error => toast.error((error as Error).message))
    }, [])

    function updateMatches(date: Date) {
        const isoDateString = date.toISOString()

        setMatches(
            allMatches.filter(match => {
                return match.date == isoDateString
            })
        )
    }

    function openMatchModal() {
        if (schools.length < 1)
            firestoreDatabase.getSchools()
                .then(schools => {
                    setSchools(schools)
                })
                .catch(error => toast.error((error as Error).message))

        setMatchesModalIsOpen(true)
    }

    function publishDaysResults() {
        matches.forEach(async match => {
            const boards = await firestoreDatabase.getBoards(match.id)
            await realtimeDatabase.writeResult("Week 2", match, boards)
        })
    }

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
                />

                <Title>Edit Matches</Title>
                <div className="flex flex-col py-16">
                    <Calendar setDate={ setDate } onChange={ updateMatches } />
                </div>

                <ConditionalRender bool={ date.getTime() != 0 } onFalse={ <p className="text-center py-16">Select a date to view matches.</p> }>
                    <List
                        title={ date.toDateString() }
                        display={ match => `${match.homeSchool.name} vs. ${match.awaySchool.name} - ${new Date(match.date).toDateString()}` }
                        state={ [matches, setMatches] }
                        onEmpty="No matches found."
                    />
                </ConditionalRender>

                <div className="w-full">
                    <div className="mx-16 2xl:mx-96">
                        <div className="flex space-x-8 w-full pt-8 ">
                            <Button onClick={ () => openMatchModal() }>Add Match</Button>
                            <Button onClick={ () => publishDaysResults() }>Publish Results</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <MatchModal isOpen={ matchesModalIsOpen } setIsOpen={ setMatchesModalIsOpen } date={ date } schools={ schools } matchesState={ [matches, setMatches] } />
        </div>
    )
}
