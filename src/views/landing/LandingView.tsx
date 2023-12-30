import React, { useState } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/NavigationBar.tsx"
import Footer from "../../components/Footer.tsx"
import HeroSection from "./components/HeroSection.tsx"
import InfoSection from "./components/InfoSection.tsx"
import ScheduleSection from "./components/ScheduleSection.tsx"
import { getMatches, Match } from "../../database/matches.ts"
import { User } from "../../database/users.ts"

interface LandingViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function LandingView({ user, setUser }: LandingViewProps) {

    const [matches, setMatches] = useState<Match[]>([])
    const [date, setDate] = useState("")

    async function updateMatches(date: Date) {
        try {
            const matches = await getMatches({ date: date })
            setMatches(matches)
        } catch (error) {
            const errorObject = error as Error

            setMatches([])

            if (errorObject.message === "Missing or insufficient permissions.")
                toast.error("Error: Please login to use this feature")
            else {
                toast.error("Error retrieving matches")
                console.log(errorObject.message)
            }
        }
    }

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <HeroSection />
            <InfoSection />
            <ScheduleSection matches={ matches } date={ date } setDate={ setDate } updateMatches={ updateMatches } />
            <Footer />
        </div>
    )
}
