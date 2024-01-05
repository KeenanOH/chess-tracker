import React, { useState } from "react"

import TextField from "../../../components/input/TextField.tsx"
import Button from "../../../components/buttons/Button.tsx"
import Modal from "../../../components/layouts/Modal.tsx"

interface OnboardingModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: (schoolAccessCode: string) => void
}

export default function OnboardingModal({ isOpen, setIsOpen, onSubmit }: OnboardingModalProps) {

    const [schoolAccessCode, setSchoolAccessCode] = useState("")

    return (
        <Modal title="Onboarding" isOpen={ isOpen } setIsOpen={ setIsOpen }>
            <p className="text-2xl mt-16 mb-4">Thank you for signing up for MSL Chess Tracker. This project was made by Keenan Nguyen (JHHS ‘25).<br /><br />Please enter your schools access code:</p>

            <TextField placeholder="School Access Code" onChange={ setSchoolAccessCode } />

            <div className="flex mt-16 w-full justify-end">
                <div className="w-48">
                    <Button onClick={ () => { onSubmit(schoolAccessCode) } }>Continue</Button>
                </div>
            </div>
        </Modal>
    )
}
