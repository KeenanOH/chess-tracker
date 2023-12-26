import React, { useState } from "react"

import TextField from "../../../components/TextField.tsx"
import Button from "../../../components/Button.tsx"

export interface LoginSubmit {
    email: string,
    password: string
}

interface LoginFormProps {
    className?: string
    onSubmit: ({ email, password }: LoginSubmit) => void
    setShowingLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginForm({ className, onSubmit, setShowingLoginForm }: LoginFormProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={ className ? className : "" }>
            <div className="space-y-8">
                <TextField placeholder="Email" onChange={ setEmail } />
                <TextField placeholder="Password" secure={ true } onChange={ setPassword } />
            </div>
            <p className="text-right text-accent">Forgot Password?</p>
            <div className="mt-8 space-y-2">
                <Button onClick={ () => { onSubmit({ email, password }) } }>Login</Button>
                <div className="flex justify-center">
                    <p
                        className="text-xl text-center text-primary hover:opacity-75 active:opacity-50 cursor-pointer"
                        onClick={ () => {
                            setShowingLoginForm(false)
                        } }
                    >
                        Register
                    </p>
                </div>
            </div>
        </div>
    )
}
