import { ReactElement } from "react"

import LoginView from "../views/login/LoginView.tsx"
import { User } from "../database/users.ts"

interface AuthViewProps {
    user: User | null
    element: ReactElement
}

export default function AuthView({ user, element }: AuthViewProps) {
    if (user) return element

    return <LoginView />
}
