import React from "react"

import { Result } from "../../../database/models/realtime/result.ts"
import Modal from "../../../components/layouts/Modal.tsx"
import ResultDisplay from "./ResultDisplay.tsx"

interface ResultModalProps {
    result?: Result
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResultModal({ result, isOpen, setIsOpen }: ResultModalProps) {
    return (
        <Modal title="Results" isOpen={ isOpen } setIsOpen={ setIsOpen }>
            { result ? <ResultDisplay result={ result } /> : <></> }
        </Modal>
    )
}
