import React, { useContext } from "react"

import { AuthContext } from "../../context/AuthContext.ts"
import LoginView from "../../views/login/LoginView.tsx";

interface AuthViewProps {
    element: React.ReactElement
}

export default function AuthView({ element }: AuthViewProps) {
    const { user } = useContext(AuthContext)

    if (user.id) return element

    return <LoginView />
}
