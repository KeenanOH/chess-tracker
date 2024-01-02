import React, { useState } from "react"

import TextField from "../../../components/input/TextField.tsx"
import Button from "../../../components/input/Button.tsx"
import GoogleSignInButton from "../../../components/input/GoogleSignInButton.tsx";

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

                <p className="text-center">--- or ---</p>

                <div className="flex justify-center">
                    <GoogleSignInButton />
                </div>

                <p className="pt-8 text-base text-center text-primary hover:opacity-75 active:opacity-50 cursor-pointer" onClick={ () => setShowingLoginForm(false) }>
                    Don't have an account?
                </p>
            </div>
        </div>
    )
}
