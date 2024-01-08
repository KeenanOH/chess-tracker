import { useContext, useState } from "react"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import BackButton from "../../components/buttons/BackButton.tsx"
import BoardGrid from "./components/BoardGrid.tsx"
import { MatchContext } from "../../context/MatchContext.ts"
import Button from "../../components/buttons/Button.tsx"
import Title from "../../components/typography/Title.tsx"
import Footer from "../../components/typography/Footer.tsx"
import { useBoards } from "../../hooks/useBoards.ts"
import AdminPublishModal from "./components/AdminPublishModal.tsx"

export default function AdminMatchView() {

    const { match} = useContext(MatchContext)

    const [boards] = useBoards()

    const [publishModalIsOpen, setPublishModalIsOpen] = useState(false)

    if (!match)
        return <p className="text-xl">Please navigate to this page through your dashboard.</p>

    return (
        <div>
            <NavigationBar />
            <BackButton />
            <Title className="pt-16 px-8">{ `${match.homeSchool.name} vs ${match.awaySchool.name} - ${new Date(match.date).toDateString()}`}</Title>
            <BoardGrid boards={ boards } />

            <div className="flex justify-center pt-32">
                <Button className="w-48" onClick={ () => setPublishModalIsOpen(true) }>Publish</Button>
            </div>

            <Footer />

            <AdminPublishModal isOpen={ publishModalIsOpen } setIsOpen={ setPublishModalIsOpen } boards={ boards } />
        </div>
    )
}
