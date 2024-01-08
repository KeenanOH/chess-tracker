import React, { useContext, useState } from "react"

import Modal from "../../../components/layouts/Modal.tsx"
import TextField from "../../../components/input/TextField.tsx"
import Button from "../../../components/buttons/Button.tsx"
import { createLabel } from "../callbacks.ts"
import { RealtimeDatabaseContext } from "../../../context/RealtimeDatabaseContext.ts"
import { Label } from "../../../database/models/realtime/label.ts"

interface LabelModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setLabels: React.Dispatch<React.SetStateAction<Label[]>>
}

export default function LabelModal({ isOpen, setIsOpen, setLabels }: LabelModalProps) {

    const realtimeDatabase = useContext(RealtimeDatabaseContext)

    const [name, setName] = useState("")

    return (
        <Modal title="Add Label" isOpen={ isOpen } setIsOpen={ setIsOpen }>
            <div className="py-8">
                <TextField placeholder="Label Name" onChange={ setName } />
            </div>

            <div className="flex items-center">
                <Button onClick={ () => createLabel(name, realtimeDatabase, setLabels, setIsOpen) }>Create</Button>
            </div>
        </Modal>
    )
}
