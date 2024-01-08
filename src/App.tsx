import {useEffect, useMemo, useState} from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import LandingView from "./views/landing/LandingView"
import AdminView from "./views/admin/AdminView.tsx"
import AuthView from "./components/layouts/AuthView.tsx"
import DashboardView from "./views/dashboard/DashboardView.tsx"
import OnboardingView from "./views/onboarding/OnboardingView.tsx"
import {auth, database, firestore} from "./database/firebaseConsts.ts"
import MatchView from "./views/match/MatchView.tsx"
import { AuthContext } from "./context/AuthContext.ts"
import LoginView from "./views/login/LoginView.tsx"
import { User } from "./database/models/firestore/user.ts"
import { FirestoreDatabaseContext } from "./context/FirestoreDatabaseContext.ts"
import { FirestoreDatabase } from "./database/firestoreDatabase.ts"
import { RealtimeDatabaseContext } from "./context/RealtimeDatabaseContext.ts"
import { RealtimeDatabase } from "./database/realtimeDatabase.ts"
import AdminMatchView from "./views/match/AdminMatchView.tsx"
import { Match } from "./database/models/firestore/match.ts"
import {MatchContext} from "./context/MatchContext.ts";
import ResultsView from "./views/results/ResultsView.tsx";

export default function App() {

    const [user, setUser] = useState<User>({ })
    const [match, setMatch] = useState<Match>()
    const firestoreDatabase = useMemo(() => new FirestoreDatabase(firestore), [])
    const realtimeDatabase = new RealtimeDatabase(database)

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
    }, [firestoreDatabase])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingView />
        },
        {
            path: "/admin",
            element: <AuthView element={ <AdminView /> } />
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
        },
        {
            path: "/admin/matches/:id",
            element: <AdminMatchView />
        },
        {
            path: "/results/:id",
            element: <ResultsView />
        }
    ])

    return (
        <AuthContext.Provider value={ { user, setUser } }>
            <FirestoreDatabaseContext.Provider value={ firestoreDatabase }>
                <RealtimeDatabaseContext.Provider value={ realtimeDatabase }>
                    <MatchContext.Provider value={ { match, setMatch} }>
                        <div className="font-montserrat">
                            <RouterProvider router={ router } />
                        </div>
                    </MatchContext.Provider>
                </RealtimeDatabaseContext.Provider>
            </FirestoreDatabaseContext.Provider>
        </AuthContext.Provider>

    )
}
