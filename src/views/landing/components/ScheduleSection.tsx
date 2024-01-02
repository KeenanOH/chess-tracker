import { useState } from "react"

import Calendar from "../../../components/input/Calendar.tsx"
import List from "../../../components/layouts/List.tsx"
import { getMatches, Match } from "../../../database/matches.ts"
import { displayMatch } from "../../../helpers.tsx"
import { toast } from "react-toastify"
import ConditionalRender from "../../../components/layouts/ConditionalRender.tsx";

export default function ScheduleSection() {

    const [matches, setMatches] = useState<Match[]>([])
    const [date, setDate] = useState<Date>(new Date(0))

    function updateMatches(date: Date) {
        getMatches({ date })
            .then(matches => setMatches(matches))
            .catch(error => toast.error((error as Error).message))
    }

    return (
        <div id="schedule-section" className="flex flex-col items-center pt-16">
            <div className="flex flex-col py-16">
                <Calendar setDate={ setDate } onChange={ updateMatches } />
            </div>

            <ConditionalRender bool={ date.getTime() != 0 } onFalse={ <p className="text-center py-16">Select a date to view matches.</p> }>
                <List
                    title={ date.toDateString() }
                    display={ displayMatch }
                    state={ [matches, setMatches] }
                    onEmpty={ <p className="text-center py-16">No matches found.</p> }
                />
            </ConditionalRender>
        </div>
    )
}
