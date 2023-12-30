import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"

import { auth } from "../../database/firebase.ts"
import LoginForm, { LoginSubmit } from "./components/LoginForm.tsx"
import RegistrationForm, { RegistrationSubmit } from "./components/RegistrationForm.tsx"
import { getUser, User } from "../../database/users.ts"

interface LoginViewProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function LoginView({ setUser }: LoginViewProps) {

    const [showingLoginForm, setShowingLoginForm] = useState(true)

    async function onLoginFormSubmit({ email, password }: LoginSubmit) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = await getUser(userCredential.user.uid)
            setUser(user)
        } catch (error) {
            const code = (error as Error).message

            if (code.includes("auth/invalid-email")) {
                toast.error("Invalid email")
            } else if (code.includes("auth/invalid-password")) {
                toast.error("Invalid password")
            } else if (code.includes("auth/invalid-credential")) {
                toast.error("Invalid credentials")
            } else {
                toast.error(code)
            }
        }
    }

    async function onRegistrationFormSubmit({ email, password, confirmPassword }: RegistrationSubmit) {
        console.log(email, password, confirmPassword)
    }

    return (
        <div>
            <div className="z-10 bg-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-xl">
                <div className="flex-col py-8 px-16 w-80 sm:w-96">
                    <p className="font-montserrat text-3xl font-bold text-center">Chess Tracker</p>
                    { showingLoginForm ?
                        <LoginForm className="mt-16" onSubmit={ onLoginFormSubmit } setShowingLoginForm={ setShowingLoginForm } />
                        :
                        <RegistrationForm className="mt-16" onSubmit={ onRegistrationFormSubmit } setShowingLoginForm={ setShowingLoginForm } />
                    }
                </div>
            </div>

            <div className="z-0 fixed bg-accent opacity-50 w-full h-full" style={ { clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)" } } />
        </div>
    )

}
