import { useState } from "react"

import Calendar from "../../../components/Calendar.tsx"
import List from "../../../components/List.tsx"
import { getMatches } from "../../../database/matches.ts"
import { displayMatches } from "../../../helpers.tsx"
import ConditionalDisplay from "../../../components/ConditionalRender.tsx"

export default function ScheduleSection() {

    const [date, setDate] = useState<Date>(new Date(0))

    return (
        <div id="schedule-section" className="flex flex-col items-center pt-16">
            <div className="flex flex-col py-16">
                <Calendar setDate={ setDate } />
            </div>

            <ConditionalDisplay bool={ date.getTime() == 0 } onFalse={ <p className="text-center pt-16">Select a date to view matches.</p> }>
                <List
                    title={ date.toDateString() }
                    loader={ getMatches({ date: new Date(date) }) }
                    display={ displayMatches }
                />
            </ConditionalDisplay>
        </div>
    )
}
