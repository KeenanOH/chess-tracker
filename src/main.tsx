import React from "react"
import ReactDOM from "react-dom/client"
import Modal from "react-modal"
import { createHashRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import OnboardingView from "./views/onboarding/OnboardingView"
import LandingView from "./views/landing/LandingView"
import LoginView from "./views/login/LoginView"


const router = createHashRouter([
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
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <body>
        <RouterProvider router={router} />
        </body>
    </React.StrictMode>
);

Modal.setAppElement("body");
