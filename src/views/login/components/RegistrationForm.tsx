import React, { useState } from "react"

import TextField from "../../../components/TextField.tsx"
import Button from "../../../components/Button.tsx"

export interface RegistrationSubmit {
    email: string
    password: string
    confirmPassword: string
}

interface RegistrationFormProps {
    className?: string
    onSubmit: ({ email, password, confirmPassword }: RegistrationSubmit) => void
    setShowingLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegistrationForm({ className, onSubmit, setShowingLoginForm }: RegistrationFormProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    return (
        <div className={ className ? className : "" }>
            <div>
                <div className="space-y-8">
                    <TextField placeholder="Email" onChange={ setEmail } />
                    <TextField placeholder="Password" secure={ true } onChange={ setPassword } />
                    <TextField placeholder="Confirm Password" secure={ true } onChange={ setConfirmPassword } />
                </div>
            </div>
            <div className="mt-8 space-y-2">
                <div className="flex justify-center">
                    <p
                        className="text-xl text-center text-primary hover:opacity-75 active:opacity-50 cursor-pointer"
                        onClick={ () => {
                            setShowingLoginForm(true)
                        } }
                    >
                        Login
                    </p>
                </div>
                <Button onClick={ () => { onSubmit({ email, password, confirmPassword }) } }>Register</Button>
            </div>
        </div>
    )
}
