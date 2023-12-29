import React from "react"

import Calendar from "../../../components/Calendar.tsx"
import MatchesList from "../../../components/MatchesList.tsx"
import { Match } from "../../../database/matches.ts"

interface ScheduleSectionProps {
    matches: Match[]
    date: string
    setDate: React.Dispatch<React.SetStateAction<string>>
    updateMatches: (date: Date) => Promise<void>
}

export default function ScheduleSection({ matches, date, setDate, updateMatches }: ScheduleSectionProps) {

    return (
        <div id="schedule-section" className="flex flex-col items-center pt-16">
            <div className="flex flex-col py-16">
                <Calendar setDate={ setDate } onChange={ updateMatches } />
            </div>

            <div className="w-full">
                <div className="mx-16 2xl:mx-96">
                    <p className="text-3xl opacity-50 pb-5">{ date }</p>
                    <div className="space-y-5">
                        {
                            date === "" ?
                                <p className="text-center pt-16">Select a date to view matches.</p>
                                :
                                <MatchesList matches={ matches } />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
