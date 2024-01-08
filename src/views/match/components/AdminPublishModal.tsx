import React, {useContext, useState} from "react"

import Modal from "../../../components/layouts/Modal.tsx"
import Button from "../../../components/buttons/Button.tsx"
import { MatchContext } from "../../../context/MatchContext.ts"
import { useLabels } from "../../../hooks/useLabels.ts"
import Dropdown from "../../../components/input/Dropdown.tsx"
import { publishMatch } from "../callbacks.ts"
import { RealtimeDatabaseContext } from "../../../context/RealtimeDatabaseContext.ts"
import { Board } from "../../../database/models/firestore/board.ts"
import { FirestoreDatabaseContext } from "../../../context/FirestoreDatabaseContext.ts"

interface AdminPublishModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    boards: Board[]
}

export default function AdminPublishModal({ isOpen, setIsOpen, boards }: AdminPublishModalProps) {

    const { match} = useContext(MatchContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)
    const realtimeDatabase = useContext(RealtimeDatabaseContext)

    const [labels] = useLabels()

    const [labelId, setLabelId] = useState<string>()

    if (!match)
        return <p>An error has occurred</p>

    return (
        <Modal title="Publish" isOpen={ isOpen } setIsOpen={ setIsOpen }>
            <div className="pt-4">
                <p>After publishing this game, no more changes will be allowed.</p>
                <p>The match will be deleted from the dashboard and be available on the results page.</p>
            </div>

            <div className="py-4">
                <p>Home School: {match.homeSchool.name}</p>
                <p>Away School: {match.awaySchool.name}</p>
                <p>Date: {new Date(match.date).toDateString()}</p>
            </div>

            <Dropdown
                placeholder="Label"
                options={ labels.map(label => { return { id: label.id, display: label.name } }) }
                onChange={ setLabelId }
            />

            <div className="flex justify-center pt-8">
                <Button
                    className="w-48"
                    onClick={ () => { publishMatch(firestoreDatabase, realtimeDatabase, labelId, match, boards) } }
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    )
}
