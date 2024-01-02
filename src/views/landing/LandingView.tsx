import React from "react"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import HeroSection from "./components/HeroSection.tsx"
import InfoSection from "./components/InfoSection.tsx"
import ScheduleSection from "./components/ScheduleSection.tsx"
import { User } from "../../database/users.ts"

interface LandingViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function LandingView({ user, setUser }: LandingViewProps) {
    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <HeroSection />
            <InfoSection />
            <ScheduleSection />
            <Footer />
        </div>
    )
}
