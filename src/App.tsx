import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import LandingView from "./views/landing/LandingView"
import AdminView from "./views/admin/AdminView.tsx"
import AuthView from "./components/layouts/AuthView.tsx"
import DashboardView from "./views/dashboard/DashboardView.tsx"
import { User } from "./database/models/user.ts"
import OnboardingView from "./views/onboarding/OnboardingView.tsx"
import { auth } from "./database/firebaseConsts.ts"
import MatchView from "./views/match/MatchView.tsx"
import { firestoreDatabase } from "./consts.ts"

export default function App() {

    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        const unsubscribeAuthObserver = auth.onAuthStateChanged(user => {
            if (user)
                firestoreDatabase.getUser(user.uid)
                    .then(user => setUser(user))
            else
                setUser(null)

            unsubscribeAuthObserver()
        })
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingView user={ user } setUser={ setUser } />
        },
        {
            path: "/admin",
            element:  <AuthView user={ user } setUser={ setUser } element={ <AdminView user={ user } setUser={ setUser } /> } />
        },
        {
            path: "/dashboard",
            element: <AuthView user={ user } setUser={ setUser } element={
                user?.schoolId ? <DashboardView user={ user } setUser={ setUser } /> : <OnboardingView user={ user} setUser={ setUser } />
            } />
        },
        {
            path: "/matches/:id",
            element: <MatchView user={ user } setUser={ setUser } />
        }
    ])

    return (
        <div className="font-montserrat">
            <RouterProvider router={ router } />
        </div>
    )
}
