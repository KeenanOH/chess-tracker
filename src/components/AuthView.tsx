import { ReactElement } from "react"
import { User } from "firebase/auth"

import LoginView from "../views/login/LoginView.tsx"

interface AuthViewProps {
    user: User | null
    element: ReactElement
}

export default function AuthView({ user, element }: AuthViewProps) {
    if (user) return element

    return <LoginView />
}
