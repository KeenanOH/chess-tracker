import React, { useContext } from "react"

import { AuthContext } from "../../context/AuthContext.ts"
import { Navigate } from "react-router-dom"

interface AuthViewProps {
    element: React.ReactElement
}

export default function AuthView({ element }: AuthViewProps) {
    const { user } = useContext(AuthContext)

    if (user.id) return element

    return <Navigate to="/login" replace={ true } />
}
