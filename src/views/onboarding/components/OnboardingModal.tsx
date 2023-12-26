import React, {useState} from "react"
import Modal from "react-modal"
import TextField from "../../../components/TextField.tsx";
import Button from "../../../components/Button.tsx";

interface OnboardingModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: (schoolAccessCode: string) => void
}

export default function OnboardingModal({ isOpen, setIsOpen, onSubmit }: OnboardingModalProps) {

    const [schoolAccessCode, setSchoolAccessCode] = useState("")

    return (
        <Modal className="flex h-full justify-center items-center border-none" isOpen={ isOpen }>
            <div className="flex flex-col bg-background border-none rounded-xl max-w-screen-md pt-4 pb-8 mx-16 shadow-lg">
                <div className="mx-16">
                    <button className="text-3xl w-full text-right hover:opacity-75 active:opacity-50" onClick={ () => { setIsOpen(false) } }>x</button>

                    <p className="text-3xl opacity-50">Onboarding</p>
                    <p className="text-2xl mt-16 mb-4">Thank you for signing up for MSL Chess Tracker. This project was made by Keenan Nguyen (JHHS ‘25).<br /><br />Please enter your schools access code:</p>

                    <TextField placeholder="School Access Code" onChange={ setSchoolAccessCode } />

                    <div className="flex mt-16 w-full justify-end">
                        <div className="w-48">
                            <Button onClick={ () => { onSubmit(schoolAccessCode) } }>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
