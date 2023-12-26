import NavigationBar from "../../components/NavigationBar.tsx"
import Footer from "../../components/Footer.tsx"
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
