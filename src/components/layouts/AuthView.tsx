import React from "react"

import LoginView from "../../views/login/LoginView.tsx"
import { User } from "../../database/firestore/users.ts"

interface AuthViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    element: React.ReactElement
}

export default function AuthView({ user, setUser, element }: AuthViewProps) {
    if (user) return element

    return <LoginView setUser={ setUser } />
}
