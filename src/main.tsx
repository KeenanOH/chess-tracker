import React from "react"
import ReactDOM from "react-dom/client"
import Modal from "react-modal"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import OnboardingView from "./views/onboarding/OnboardingView"
import LandingView from "./views/landing/LandingView"
import LoginView from "./views/login/LoginView"
import AdminView from "./views/admin/AdminView.tsx"


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingView />
    },
    {
        path: "/login",
        element: <LoginView />
    },
    {
        path: "/onboarding",
        element: <OnboardingView />
    },
    {
        path: "/admin",
        element: <AdminView />
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>
);

Modal.setAppElement("#root");
