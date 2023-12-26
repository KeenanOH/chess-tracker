import React, { useState } from "react"
import Calendar from "../../../components/Calendar.tsx"
import ListRow from "../../../components/ListRow.tsx"

export default function ScheduleSection() {

    const [date, setDate] = useState({
        display: "",
        value: ""
    })

    return (
        <div id="schedule-section" className="flex flex-col items-center pt-16">
            <div className="flex flex-col py-16">
                <Calendar setDate={ setDate } />
            </div>

            <div className="w-full">
                <div className="mx-16 2xl:mx-96">
                    <p className="text-3xl opacity-50 pb-5">{ date.display }</p>
                    <div className="space-y-5">
                        <ListRow>Test</ListRow>
                        <ListRow>Test</ListRow>
                        <ListRow>Test</ListRow>
                    </div>
                </div>
            </div>
        </div>
    )
}
