import React, { useState } from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import Footer from "../../components/Footer.tsx"
import Calendar from "../../components/Calendar.tsx"
import { User } from "../../database/users.ts"
import List from "../../components/List.tsx"
import { getMatches } from "../../database/matches.ts"
import { displayMatches } from "../../helpers.tsx"

interface AdminViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function AdminView({ user, setUser }: AdminViewProps) {

    const [date, setDate] = useState<Date>(new Date(0))

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <div className="flex flex-col items-center pt-8">
                <div className="flex flex-col py-16">
                    <Calendar setDate={ setDate } />
                </div>

                <List
                    title={ date.toDateString() }
                    loader={ getMatches({ date: new Date(date) }) }
                    display={ displayMatches }
                />
            </div>

            <Footer />
        </div>
    )
}
