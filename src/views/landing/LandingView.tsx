import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import Footer from "../../components/typography/Footer.tsx"
import HeroSection from "./components/HeroSection.tsx"
import InfoSection from "./components/InfoSection.tsx"
import ScheduleSection from "./components/ScheduleSection.tsx"

export default function LandingView() {
    return (
        <div>
            <NavigationBar />
            <HeroSection />
            <InfoSection />
            <ScheduleSection />
            <Footer />
        </div>
    )
}
