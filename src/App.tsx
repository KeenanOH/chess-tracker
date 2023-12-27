import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { User, onAuthStateChanged } from "firebase/auth"

import OnboardingView from "./views/onboarding/OnboardingView"
import LandingView from "./views/landing/LandingView"
import AdminView from "./views/admin/AdminView.tsx"
import AuthView from "./components/AuthView.tsx"
import DashboardView from "./views/dashboard/DashboardView.tsx"
import { auth } from "./database/firebase.ts"

export default function App() {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    })

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingView />
        },
        {
            path: "/onboarding",
            element: <OnboardingView />
        },
        {
            path: "/admin",
            element:  <AuthView user={ user } element={ <AdminView /> } />
        },
        {
            path: "/dashboard",
            element: <AuthView user={ user } element={ <DashboardView /> } />
        }
    ])

    return (
        <div className="font-montserrat">
            <RouterProvider router={ router } />
        </div>
    )
}
