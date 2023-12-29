import { useState } from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import Footer from "../../components/Footer.tsx"
import HeroSection from "./components/HeroSection.tsx"
import InfoSection from "./components/InfoSection.tsx"
import ScheduleSection from "./components/ScheduleSection.tsx"
import { getMatches, Match } from "../../database/matches.ts"

export default function LandingView() {

    const [matches, setMatches] = useState<Match[]>([])
    const [date, setDate] = useState("")

    async function updateMatches(date: Date) {
        const matches = await getMatches({ date: date })
        setMatches(matches)
    }

    return (
        <div>
            <NavigationBar />
            <HeroSection />
            <InfoSection />
            <ScheduleSection matches={ matches } date={ date } setDate={ setDate } updateMatches={ updateMatches } />
            <Footer />
        </div>
    )
}
