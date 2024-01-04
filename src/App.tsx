import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import LandingView from "./views/landing/LandingView"
import AdminView from "./views/admin/AdminView.tsx"
import AuthView from "./components/layouts/AuthView.tsx"
import DashboardView from "./views/dashboard/DashboardView.tsx"
import OnboardingView from "./views/onboarding/OnboardingView.tsx"
import { auth } from "./database/firebaseConsts.ts"
import MatchView from "./views/match/MatchView.tsx"
import { firestoreDatabase } from "./consts.ts"
import { AuthContext } from "./context/AuthContext.ts"
import LoginView from "./views/login/LoginView.tsx"
import { User } from "./database/models/user.ts"

export default function App() {

    const [user, setUser] = useState<User>({ })

    useEffect(() => {
        const unsubscribeAuthObserver = auth.onAuthStateChanged(user => {
            if (user)
                firestoreDatabase.getUser(user.uid)
                    .then(user => {
                        setUser(user)
                    })
            else
                setUser({ })

            unsubscribeAuthObserver()
        })
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingView />
        },
        {
            path: "/admin",
            element: <AuthView element={ <AdminView />} />
        },
        {
            path: "/dashboard",
            element: <AuthView element={ user.schoolId ? <DashboardView /> : <OnboardingView /> } />
        },
        {
            path: "/matches/:id",
            element: <AuthView element={ <MatchView />} />
        },
        {
            path: "/login",
            element: <LoginView />
        }
    ])

    return (
        <AuthContext.Provider value={ { user, setUser } }>
            <div className="font-montserrat">
                <RouterProvider router={ router } />
            </div>
        </AuthContext.Provider>

    )
}
