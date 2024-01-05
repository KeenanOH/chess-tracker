import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import BackButton from "../../components/buttons/BackButton.tsx"
import BoardGrid from "./components/BoardGrid.tsx"
import { Board } from "../../database/models/firestore/board.ts"
import { MatchContext } from "../../context/MatchContext.ts"
import { FirestoreDatabaseContext } from "../../context/FirestoreDatabaseContext.ts"
import Button from "../../components/buttons/Button.tsx"
import { RealtimeDatabaseContext } from "../../context/RealtimeDatabaseContext.ts"
import Title from "../../components/typography/Title.tsx"

export default function AdminMatchView() {

    const firestoreDatabase = useContext(FirestoreDatabaseContext)
    const realtimeDatabase = useContext(RealtimeDatabaseContext)
    const { match} = useContext(MatchContext)

    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        if (!match) {
            toast.error("Please navigate to this page through your dashboard.")
            return
        }

        firestoreDatabase.getBoards(match.id)
            .then(boards => setBoards(boards))
            .catch(error => toast.error((error as Error).message))

    }, [])

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
        </div>
    )
}
