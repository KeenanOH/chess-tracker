import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { Board, getBoards } from "../../database/boards.ts"
import NavigationBar from "../../components/NavigationBar.tsx"
import { User } from "../../database/users.ts"
import { toast } from "react-toastify";
import BoardCell from "./components/BoardCell.tsx"
import Button from "../../components/Button.tsx"
import ConditionalRender from "../../components/ConditionalRender.tsx"

interface MatchViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function MatchView({ user, setUser }: MatchViewProps) {
    
    const location = useLocation()
    const { id } = useParams()

    const [boards, setBoards] = useState<Board[]>([])

    useEffect(() => {
        let matchId: string

        if (location.state.match.id)
            matchId = location.state.match.id
        else if (id)
            matchId = id
        else
            return

        getBoards(matchId)
            .then(boards => setBoards(boards))
            .catch(error => toast.error((error as Error).message))
    }, [location, id])

    return (
        <div>
            <NavigationBar user={ user } setUser={ setUser } />
            <ConditionalRender bool={ boards.length == 0 }>
                <p className="py-16 text-center">There are no boards here. Add a board to start reporting scores.</p>
            </ConditionalRender>

            <div className="grid grid-cols-1 space-y-8 sm:space-y-0 sm:grid-cols-4 pt-16">
                {
                    boards.map(board => {
                        return <BoardCell key={ board.id } board={ board } />
                    })
                }
            </div>

            <ConditionalRender bool={ boards.length < 8 }>
                <div className="flex justify-center">
                    <div className="w-48">
                        <Button>Add a Board</Button>
                    </div>
                </div>
            </ConditionalRender>
        </div>

    )
}
