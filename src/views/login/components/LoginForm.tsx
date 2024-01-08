import React, { useContext, useState } from "react"

import TextField from "../../../components/input/TextField.tsx"
import Button from "../../../components/buttons/Button.tsx"
import GoogleSignInButton from "../../../components/buttons/GoogleSignInButton.tsx"
import { handleGoogleSignIn } from "../callbacks.ts"
import { AuthContext } from "../../../context/AuthContext.ts"
import { FirestoreDatabaseContext } from "../../../context/FirestoreDatabaseContext.ts"

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

    const { setUser } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)

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
                <Button className="w-full" onClick={ () => { onSubmit({ email, password }) } }>Login</Button>

                <p className="text-center">--- or ---</p>

                <div className="flex justify-center">
                    <GoogleSignInButton onClick={ () => { handleGoogleSignIn(firestoreDatabase, setUser).then() } } />
                </div>

                <p className="pt-8 text-base text-center text-primary hover:opacity-75 active:opacity-50 cursor-pointer" onClick={ () => setShowingLoginForm(false) }>
                    Don't have an account?
                </p>
            </div>
        </div>
    )
}
