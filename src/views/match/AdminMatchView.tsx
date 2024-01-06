import { useContext } from "react"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import BackButton from "../../components/buttons/BackButton.tsx"
import BoardGrid from "./components/BoardGrid.tsx"
import { MatchContext } from "../../context/MatchContext.ts"
import Button from "../../components/buttons/Button.tsx"
import { RealtimeDatabaseContext } from "../../context/RealtimeDatabaseContext.ts"
import Title from "../../components/typography/Title.tsx"
import Footer from "../../components/typography/Footer.tsx"
import { useBoards } from "../../hooks/useBoards.ts"

export default function AdminMatchView() {

    const realtimeDatabase = useContext(RealtimeDatabaseContext)
    const { match} = useContext(MatchContext)

    const [boards] = useBoards()

    function publish() {
        realtimeDatabase.createResult("-NnMZ8UG-IIYuZQPcxkC", match!, boards)
            .then()
    }

    if (!match)
        return <p className="text-xl">Please navigate to this page through your dashboard.</p>

    return (
        <div>
            <NavigationBar />
            <BackButton />
            <Title className="pt-16 px-8">{ `${match.homeSchool.name} vs ${match.awaySchool.name} - ${new Date(match.date).toDateString()}`}</Title>
            <BoardGrid boards={ boards } />

            <div className="flex justify-center pt-32">
                <div className="w-48">
                    <Button onClick={ publish }>Publish</Button>
                </div>
            </div>

            <Footer />
        </div>
    )
}
